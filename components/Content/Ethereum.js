import React, { useEffect } from 'react'
import { useMetamask } from '../../hooks/useMetamask';
import MainLandingContent from './MainLandingContent'

const Ethereum = ({ signing, loading, handleSign, fileInfo, gallery, fullResponse, handleChangePage, ethereum, setEthereum }) => {
  useEffect(() => {    
    if (typeof window.ethereum !== "undefined" && fileInfo && fileInfo.unlockInfo && fileInfo.unlockInfo.blockchain === "Ethereum") {
  
      console.log("MetaMask is installed!");
      setEthereum(window.ethereum);
    }
    if (ethereum) {
      console.log("here we go");
      ethereum.request({ method: "eth_requestAccounts" });
    }
  }, [ethereum, fileInfo]);

  return (
    <div>
      <MainLandingContent handleChangePage={handleChangePage} fullResponse={fullResponse} gallery={gallery} fileInfo={fileInfo} loading={loading} signing={signing} handleSign={handleSign} />
    </div>
  )
}

export default Ethereum