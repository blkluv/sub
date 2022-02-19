import { useEffect, useState } from 'react';
import axios from 'axios';
import { getTypedData, signTypedData } from '../pages/helpers/signing';

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

  const signTypedData = async (address, network, id) => {  
    const networks =  {
      "ETH - Mainnet": 1, 
      "ETH - Ropsten": 3, 
      "ETH - Rinkeby": 4, 
      "Polygon - Mainnet": 137, 
      "Polygon - Mumbai": 80001
    }
    const from = address;

    const msgParams = JSON.stringify({
      domain: {        
        chainId: networks[network],  
        name: 'Submarine Me',
        version: '1',
      },
  
      // Defining the message signing data content.
      message: {
        contents: `Nonce to sign from server: ${id}`,
        id: id
      },
      // Refers to the keys of the *types* object below.
      primaryType: 'ProveOwnership',
      types: {
        // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' }
        ],
        ProveOwnership: [       
          { name: "id", type: "string" }, 
        ]       
      },
    });

    // const msgParams = getTypedData(network, message);
    var params = [from, msgParams];
    var method = 'eth_signTypedData_v4';
    setChecking(true);
    ethereum.sendAsync({
      method,
      params,
      from,
    }, async function (err, result) {
      if (err) {
        setChecking(false);
        return console.dir(err);
      } 
      if (result.error) {
        setChecking(false);
        alert(result.error.message);
      }
      if (result.error) {
        setChecking(false);
        return console.error('ERROR', result)
      };
      console.log(result.result);
      const serverRes = await axios.post("/api/verify", {
          address: account,
          params: msgParams,
          signature
      });
    });
  }

  const signData = async (network) => {    
    const messageToSign = await axios.get("/api/verify");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    //  HARDCODED TEST
    network = "ETH - Mainnet"


    // const typedData = getTypedData(network, messageToSign);    
    
    const signature = await signTypedData(account, network, messageToSign.data.id);
    // try {
    //   const res = await axios.post("/api/verify", {
    //     address: account,
    //     signature
    //   });
    //   const url = res.data;
      
    //   setUrl(url);
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     setHoldsNFT(false);
    //   }
    // }
  };

  return {
    signData,
    ethereum, 
    url,
    holdsNFT
  };
};