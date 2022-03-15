import { useState } from 'react';
import { useMetamask } from "../../hooks/useMetamask";
import Pinnie from "../Pinnie";
import SubmarineLogoSvg from "../SubmarineLogoSvg";
import axios from 'axios';
import Solana from './Solana';
import Ethereum from './Ethereum';
import Missing from './Missing';

export default function ContentLanding({ loading, fileInfo, missing }) {
  console.log(fileInfo);
  const [signing, setSigning] = useState(false);
  const { signData } = useMetamask();
  const handleSign = async () => {
    try {
      setSigning(true);
      if(fileInfo.unlockInfo.blockchain === "Solana") {
        const url = await signDataSol(fileInfo);
        if(url) {
          setSigning(false);
          window.location.replace(url);
        } 
      } else {
        const url = await signData(fileInfo);
        if(url) {
          setSigning(false);
          window.location.replace(url);
        } 
      }          
    } catch (error) {
      setSigning(false)
      alert(error.message)
    }    
  }

  return (
    <div>
      {
        missing ? 
        <Missing /> :
        <div>
{
        fileInfo && fileInfo.unlockInfo && fileInfo.unlockInfo.blockchain && fileInfo.unlockInfo.blockchain === "Solana" ? 
        <Solana fileInfo={fileInfo} loading={loading} signing={signing} handleSign={handleSign} /> : 
        <Ethereum fileInfo={fileInfo} loading={loading} signing={signing} handleSign={handleSign} />
      }
        </div>
      }
      
    </div>
  );
}
