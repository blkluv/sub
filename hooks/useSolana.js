import { useEffect, useState, FC, useCallback } from "react";
import axios from "axios";
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { sign } from 'tweetnacl';

export const useSolana = () => {
  const { publicKey, signMessage } = useWallet();
  const [solana, setSolana] = useState(null);
  const [url, setUrl] = useState("");
  const [holdsNFT, setHoldsNFT] = useState(false);


  useEffect(() => {
    
  }, [solana]);

  const signData = async (metadata) => {
    try {
      const { shortId, submarineCID, unlockInfo } = metadata;
      const { updateAuthority, blockchain, tokenId, network, mintAddress } = unlockInfo;

      if (!signMessage) alert('Wallet does not support message signing!');
      const messageToSign = await axios.get(`/api/verifySol?updateAuthority=${updateAuthority}`);      

      const message = new TextEncoder().encode(`To verify you own the NFT in question,
you must sign this message. 
The NFT update authority address is:
${messageToSign.data.updateAuthority}
The verification id is: 
${messageToSign.data.id}`);

      const signature = bs58.encode(await signMessage(message));
    
      const res = await axios.post("/api/verifySol", {
        address: publicKey.toString(),
        signature,
        network,
        updateAuthority,
        mintAddress, 
        blockchain, 
        tokenId,
        CID: submarineCID,
        shortId: shortId, 
        message: messageToSign.data
      });
      const url = res.data;     
      return url; 
    } catch (error) {
      throw error;
    }    
  };

  return {
    signData,
    solana,
    url,
    holdsNFT,
    url
  };
};
