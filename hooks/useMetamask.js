import { useState } from "react";
import axios from "axios";

export const EVMChains = ["Ethereum", "Polygon", "Avalanche"];

export const useMetamask = () => {
  const [ethereum, setEthereum] = useState(null);
  const [url, setUrl] = useState("");
  const [holdsNFT, setHoldsNFT] = useState(false);

  const signData = async (metadata) => {
    try {
      const { shortId, submarineCID, unlockInfo } = metadata;
      const { contract, blockchain, tokenId, network } = unlockInfo;
      const messageToSign = await axios.get(`/api/verify?contract=${contract}`);
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      const signature = await ethereum.request({
        method: "personal_sign",
        params: [
          `To verify you own the NFT in question,
you must sign this message. 
The NFT contract address is:
${messageToSign.data.contract}
The verification id is: 
${messageToSign.data.id}`, //JSON.stringify(messageToSign.data),
          account,
          messageToSign.data.id,
        ],
      });

      const res = await axios.post("/api/verify", {
        address: account,
        signature,
        network,
        contractAddress: contract,
        blockchain,
        tokenId,
        CID: submarineCID,
        shortId: shortId,
      });
      const data = res.data;
      data.signature = signature;
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    signData,
    ethereum,
    url,
    holdsNFT,
    url,
    setEthereum,
    EVMChains,
  };
};
