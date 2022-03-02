import axios from "axios";
import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { withIronSession } from "next-iron-session";
import * as util from "ethereumjs-util";
import { json } from "../../erc721";
import { getUserContentCombo } from "../../helpers/verify.helpers";
import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";

function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "web3-auth-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { network, contractAddress, CID, address, signature, shortId } =
        req.body;
      const networkMap = {
        "ETH - Mainnet": process.env.ALCHEMY_MAINNET,
        "ETH - Ropsten": process.env.ALCHEMY_ROPSTEN,
        "ETH - Rinkeby": process.env.ALCHEMY_RINKEBY,
        "Polygon - Mainnet": process.env.ALCHEMY_POLYGON,
        "Polygon - Mumbai": process.env.ALCHEMY_MUMBAI,
      };

      const message = req.session.get("message-session");
      const provider = await new ethers.providers.JsonRpcProvider(
        networkMap[network]
      );
      const contract = await new ethers.Contract(
        contractAddress,
        json(),
        provider
      );
      const fullMessage = `To verify you own the NFT in question,
you must sign this message. 
The NFT contract address is:
${contractAddress}
The verification id is: 
${message.id}`;
      let nonce = `\x19Ethereum Signed Message:
${fullMessage.length}${fullMessage}`;
      nonce = util.keccak(Buffer.from(nonce, "utf-8"));
      const { v, r, s } = util.fromRpcSig(signature);
      const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s);
      const addrBuf = util.pubToAddress(pubKey);
      const recoveredAddress = util.bufferToHex(addrBuf);
      if (address === recoveredAddress) {
        const balance = await contract.balanceOf(recoveredAddress);
        if (balance.toString() !== "0") {
          const info = await getUserContentCombo(shortId);
          const { pinata_submarine_key, pinata_gateway_subdomain } = info.Users;
          const config = {
            headers: {
              "x-api-key": `${pinata_submarine_key}`,
              "Content-Type": "application/json",
            },
          };
          const content = await axios.get(
            `${process.env.NEXT_PUBLIC_MANAGED_API}/content`,
            config
          );

          const { data } = content;
          const { items } = data;
          const item = items.find((i) => i.cid === CID);
          const body = {
            timeoutSeconds: 3600,
            contentIds: [item.id],
          };
          const token = await axios.post(
            `${process.env.NEXT_PUBLIC_MANAGED_API}/auth/content/jwt`,
            body,
            config
          );
          const GATEWAY_URL = `https://${pinata_gateway_subdomain}.${process.env.NEXT_PUBLIC_GATEWAY_ROOT}.cloud`;
          return res.send(
            `${GATEWAY_URL}/ipfs/${CID}?accessToken=${token.data}`
          );
        } else {
          return res.status(401).send("Token not found. Check your network.");
        }
      } else {
        return res.status(401).send("Invalid signature");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    try {
      // const message = { contract: req.query.contract, id: uuidv4() };
      // req.session.set("message-session", message);
      // await req.session.save();
      // res.json(message);
      const address = "4mUrPtCmERXbTDFPDPkReFcqKnmArd9HqrPBXopCjYrD";

      const publicAddress = await resolveToWalletAddress({
        text: address,
      });
      console.log({publicAddress});

      const nftArray = await getParsedNftAccountsByOwner({
        publicAddress,
      });
      console.log(nftArray.map(a => a.data).map(d => d.creators));
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error;
      res.status(fetchResponse?.status || 500).json(error.data);
    }
  } else {
    res.status(200).json({
      message: "This is the way...wait, no it is not. What are you doing here?",
    });
  }
});
