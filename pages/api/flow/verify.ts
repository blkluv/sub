import { v4 as uuidv4 } from "uuid";
import { getFcl } from "../../../flow/fcl";
import { getMessagetoSign } from "../../../helpers/messageToSign";
import { getSubmarinedContent } from "../../../helpers/submarine";
import { withSessionRoute } from "../../../helpers/withSession";
import { getUserContentCombo } from "../../../repositories/content";
import { BlockchainOptions, FlowNetwork } from "../../../types/UnlockInfo";
import { getScript } from "./getCadenceScript";
type Session = {
  contract: string;
  id: string;
};
const handler = async (req, res) => {
  // allow CORS on this method
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method === "POST") {
    try {
      const session: Session = req.session.flowMessage;
      const { contract, id } = session;
      const payload = req.body;
      const { signature, shortId } = payload;

      const info = await getUserContentCombo(shortId);
      if (!info) {
        res.status(404).json({ error: "Content not found" });
        return;
      }
      const { unlock_info } = info;
      if (unlock_info.type !== "nft" || unlock_info.blockchain !== BlockchainOptions.Flow) {
        res.status(404).json({ error: "Content not found" });
        return;
      }

      const message = getMessagetoSign(contract, id);
      const hexMessage = Buffer.from(message).toString("hex");
      const { tokenId, network } = unlock_info;
      const fcl = getFcl(network);
      const isValid = await fcl.AppUtils.verifyUserSignatures(hexMessage, signature);

      if (isValid) {
        const hasNFT = await verifyNFTOwnershipOnFlowBlockchain(
          signature[0].addr,
          contract,
          network,
          tokenId
        );
        if (hasNFT) {
          const { submarine_cid } = info;
          const { pinata_submarine_key, pinata_gateway_subdomain } = info.Users;

          if (!pinata_submarine_key || !pinata_gateway_subdomain) {
            return res.status(401).send("No submarine key found");
          }
          const responseObj = await getSubmarinedContent(
            pinata_submarine_key,
            submarine_cid,
            pinata_gateway_subdomain
          );
          res.status(200).json(responseObj);
        } else {
          res.status(401).send(`Failed to verify NFT ownership`);
        }
      } else {
        res.status(401).send(`Failed to verify signature`);
      }
      return;
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    }
  } else if (req.method === "GET") {
    const payload: Session = { contract: req.query.contract, id: uuidv4() };
    req.session.flowMessage = payload;
    await req.session.save();
    res.status(200).json(payload);
    return;
  }
};

export default withSessionRoute(handler);

async function verifyNFTOwnershipOnFlowBlockchain(
  address: string,
  contractAddress: string,
  network: FlowNetwork,
  tokenId?: string
): Promise<boolean> {
  const fcl = getFcl(network);
  const result = await fcl.query({
    cadence: getScript(network),
    args: (arg, t) => [arg(address, t.Address)],
  });
  const catalog = result[contractAddress];
  if (!tokenId) {
    return !!catalog;
  }
  return catalog.find((nft) => nft.id === tokenId);
}
