import { v4 as uuidv4 } from "uuid";
import { withIronSession } from "next-iron-session";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import bs58 from "bs58";
import { sign } from "tweetnacl";
import { clusterApiUrl, Commitment, Connection } from "@solana/web3.js";
import { getSubmarinedContent } from "../../helpers/submarine";
import { Sentry } from "../../helpers/sentry";
import { getUserContentCombo } from "../../repositories/content";
import { getMessagetoSign } from "../../helpers/messageToSign";

function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "web3-auth-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}

function createConnectionConfig(
  network,
  clusterApi = process.env.ALCHEMY_SOLANA_MAINNET || clusterApiUrl("mainnet-beta"),
  commitment: Commitment = "confirmed"
) {
  if (network === "Devnet") {
    clusterApi = process.env.ALCHEMY_SOLANA_DEVNET || clusterApiUrl("devnet");
  }
  return new Connection(clusterApi, commitment);
}

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { network, updateAuthority, CID, address, signature, shortId, message, mintAddress } =
        req.body;

      const savedMessage = req.session.get("message-session");

      const fullMessage = getMessagetoSign(updateAuthority, savedMessage.id);
      const signedMessage = new TextEncoder().encode(fullMessage);

      if (message.id !== savedMessage.id) {
        return res.status(401).send(`Invalid signature attempt.`);
      }

      if (!sign.detached.verify(signedMessage, bs58.decode(signature), bs58.decode(address))) {
        return res.status(401).send(`Invalid signature or NFT not owned by public key provided.`);
      }

      const nftArray = await getParsedNftAccountsByOwner({
        publicAddress: address,
        connection: createConnectionConfig(network),
      });

      if (!nftArray || nftArray.length === 0) {
        return res.status(401).send("NFT not associated with your public key.");
      }

      let foundUpdateAuthority = nftArray.filter(
        (n) => n.updateAuthority === savedMessage.updateAuthority
      );

      if (mintAddress) {
        let filteredByMintAddress = foundUpdateAuthority.filter((f) => f.mint === mintAddress);
        foundUpdateAuthority = filteredByMintAddress;
      }

      if (!foundUpdateAuthority || foundUpdateAuthority.length === 0) {
        return res.status(401).send("NFT not associated with your public key.");
      }

      if (!shortId) {
        return res.json(true);
      }

      const info = await getUserContentCombo(shortId);
      const { submarine_cid } = info;
      const { pinata_submarine_key, pinata_gateway_subdomain } = info.Users;
      const responseObj = await getSubmarinedContent(
        pinata_submarine_key,
        submarine_cid,
        pinata_gateway_subdomain
      );
      return res.json(responseObj);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      Sentry.captureException(error);
      res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    try {
      const message = {
        updateAuthority: req.query.updateAuthority,
        id: uuidv4(),
      };
      req.session.set("message-session", message);
      await req.session.save();
      return res.json(message);
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error;
      return res.status(fetchResponse?.status || 500).json(error.data);
    }
  } else {
    res.status(200).json({
      message: "This is the way...wait, no it is not. What are you doing here?",
    });
  }
});
