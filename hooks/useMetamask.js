import { useEffect, useState } from "react";
import axios from "axios";
import { getTypedData, signTypedData } from "../helpers/signing";

export const useMetamask = () => {
  const [ethereum, setEthereum] = useState(null);
  const [url, setUrl] = useState("");
  const [holdsNFT, setHoldsNFT] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      setEthereum(window.ethereum);
    }
    if (ethereum) {
      ethereum.request({ method: "eth_requestAccounts" });
    }
  }, [ethereum]);

  const signData = async (network, shortId, contract, submarineCid) => {
    try {
      const messageToSign = await axios.get("/api/verify");
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      const signature = await ethereum.request({
        method: "personal_sign",
        params: [
          JSON.stringify(messageToSign.data),
          account,
          messageToSign.data.id,
        ],
      });
  
      const res = await axios.post("/api/verify", {
        address: account,
        signature,
        network,
        contractAddress: contract,
        CID: submarineCid,
        shortId: shortId
      });
      const url = res.data;
      console.log(url);
      return url; 
    } catch (error) {
      throw error;
    }    
  };

  return {
    signData,
    ethereum,
    url,
    holdsNFT,
    url
  };
};
