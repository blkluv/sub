import { ethers } from "ethers";
import { verifyMessage } from "ethers/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { json } from "../../erc721";
import { erc1155 } from "../../erc1155";
import { getSubmarinedContent } from "../../helpers/submarine";
import { Sentry } from "../../helpers/sentry";
import { getSupabaseClient } from "../../helpers/supabase";
import { definitions } from "../../types/supabase";
import { getUserContentCombo } from "../../repositories/content";
import { getMessagetoSign } from "../../helpers/messageToSign";

const supabase = getSupabaseClient();

async function checkErc721Balance(contract, address) {
  try {
    const balance = await contract.balanceOf(address);
    return balance;
  } catch (error) {
    // console.log(error);
    return null;
  }
}

async function checkErc1155Balance(contract, address, tokenId) {
  try {
    const balance = await contract.balanceOf(address, tokenId);
    return balance;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const {
        network,
        contractAddress,
        CID,
        address,
        signature,
        shortId,
        blockchain,
        tokenId,
        messageId,
      } = req.body;
      const networkMap = {
        "ETH - Mainnet": process.env.ALCHEMY_MAINNET,
        "ETH - Goerli": process.env.ALCHEMY_GOERLI,
        "Polygon - Mainnet": process.env.ALCHEMY_POLYGON,
        "Polygon - Mumbai": process.env.ALCHEMY_MUMBAI,
        Ethereum: {
          Mainnet: process.env.ALCHEMY_MAINNET,
          Goerli: process.env.ALCHEMY_GOERLI,
        },
        Polygon: {
          Mainnet: process.env.ALCHEMY_POLYGON,
          Mumbai: process.env.ALCHEMY_MUMBAI,
        },
        Avalanche: {
          Mainnet: process.env.AVAX_MAIN,
          Fuji: process.env.AVAX_TEST,
        },
      };

      let { data: Session, error } = await supabase
        .from<definitions["Session"]>("Session")
        .select("*")
        .eq("id", messageId);

      const message = Session[0];

      if (message.used) {
        throw "This signature has already been used";
      }

      const { data, error: updateError } = await supabase
        .from<definitions["Session"]>("Session")
        .update({ used: true })
        .match({ id: messageId });

      if (updateError) {
        throw error;
      }

      const rpc = blockchain && network ? networkMap[blockchain][network] : networkMap[network];
      const provider = await new ethers.providers.JsonRpcProvider(rpc);
      let contract = await new ethers.Contract(contractAddress, json(), provider);

      const fullMessage = getMessagetoSign(contractAddress, message.id);
      const recoveredAddress = verifyMessage(fullMessage, signature);

      if (address === recoveredAddress) {
        let balance = await checkErc721Balance(contract, recoveredAddress);
        if (balance && tokenId) {
          const owner = await contract.ownerOf(tokenId);
          if (owner.toString().toLowerCase() !== recoveredAddress.toLowerCase()) {
            return res.status(401).send(`Token ID ${tokenId} not owned by ${address}`);
          }
        }
        if (!balance) {
          contract = await new ethers.Contract(contractAddress, erc1155(), provider);
          balance = await checkErc1155Balance(contract, recoveredAddress, tokenId);
        }

        if (balance && balance.toString() !== "0") {
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
        } else {
          return res.status(401).send("Token not found. Check your network.");
        }
      } else {
        return res.status(401).send("Invalid signature");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      return res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    try {
      const sessionObject = {
        id: uuidv4(),
        contract: req.query.contract,
        shortId: req.query.shortId || null,
      };
      const { data, error } = await supabase.from("Session").insert([sessionObject]);

      if (error) {
        throw error;
      }
      const fullMessage = getMessagetoSign(sessionObject.contract, sessionObject.id);
      return res.json({ session: sessionObject, message: fullMessage });
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error;
      Sentry.captureException(error);
      return res.status(fetchResponse?.status || 500).json(error.data);
    }
  } else {
    return res.status(200).json({
      message: "This is the way...wait, no it is not. What are you doing here?",
    });
  }
};

export default handler;
