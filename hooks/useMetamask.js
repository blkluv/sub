import { useEffect, useState } from 'react';
import axios from 'axios';
import { getTypedData, signTypedData } from '../pages/helpers/signing';

export const useMetamask = () => {
  const [ethereum, setEthereum] = useState(null);
  const [url, setUrl] = useState("");
  const [holdsNFT, setHoldsNFT] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      setEthereum(window.ethereum);
    }
    if (ethereum) {
      ethereum.request({ method: "eth_requestAccounts" });
    }
  }, [ethereum]);

  const signData = async (network) => {    
    const messageToSign = await axios.get("/api/verify");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    const typedData = getTypedData(network, messageToSign);    
    const signature = signTypedData(accounts, network);
    console.log(signature);
    try {
      const res = await axios.post("/api/verify", {
        address: account,
        signature
      });
      const url = res.data;
      
      setUrl(url);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setHoldsNFT(false);
      }
    }
  };

  return {
    signData,
    ethereum, 
    url,
    holdsNFT
  };
};