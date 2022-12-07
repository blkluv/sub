import { v4 as uuidv4 } from "uuid";
import fcl from "../../../flow/fcl";
import { getMessagetoSign } from "../../../helpers/messageToSign";
import { getSupabaseClient } from "../../../helpers/supabase";
import { withSessionRoute } from "../../../helpers/withSession";

// const supabase = getSupabaseClient();
type Session = {
  contract: string;
  id: string;
};
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const session: Session = req.session.flowMessage;
      const { contract, id } = session;
      const payload = req.body;
      const signature = payload;
      const message = getMessagetoSign(contract, id);
      const hexMessage = Buffer.from(message).toString("hex");
      const isValid = await fcl.AppUtils.verifyUserSignatures(hexMessage, signature);
      console.log({ isValid });
      if (isValid) {
        const hasNFT = verifyNFTOwnershipOnFlowBlockchain(contract, signature.addr);
        if (hasNFT) {
        }
      }
      res.status(200).json({ ok: isValid });
      return;
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    }
  } else if (req.method === "GET") {
    const payload = { contract: req.query.contract, id: uuidv4() };
    req.session.flowMessage = payload;
    await req.session.save();
    res.status(200).json(payload);
    return;
  }
};

export default withSessionRoute(handler);

async function verifyNFTOwnershipOnFlowBlockchain(contract, address) {
  const script = `
    import NonFungibleToken from 0xNonFungibleToken
    import Submarine from 0xSubmarine

    pub fun main(address: Address): Bool {
      let collectionRef = getAccount(address)
        .getCapability(/public/SubmarineNFTCollection)!
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

      return collectionRef.checkMintingPermission(address: address)
    }
  `;
  const args = [fcl.arg(address, t.Address)];
  const encoded = await fcl.send([
    fcl.script(script),
    fcl.args(args),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(100),
  ]);
  const decoded = await fcl.decode(encoded);
  return decoded;
}
