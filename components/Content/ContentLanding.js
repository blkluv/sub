import { useState } from 'react';
import { useMetamask } from "../../hooks/useMetamask";
import Pinnie from "../Pinnie";
import SubmarineLogoSvg from "../SubmarineLogoSvg";
import axios from 'axios';
import Solana from './Solana';
import Ethereum from './Ethereum';
import Missing from './Missing';
import Gallery from './Gallery';
import RetweetLanding from './RetweetLanding';

export default function ContentLanding({ loading, fileInfo, missing }) {
  const [signing, setSigning] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [fullResponse, setFullResponse] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(50);

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
        const res = await signData(fileInfo);
        if(res && !res.directory) {
          setSigning(false);
          window.location.replace(`${res.gateway}/ipfs/${res.cid}?accessToken=${res.token}`);
        } else if(res && res.html) {
          setSigning(false);
          window.location.replace(`${res.gateway}/ipfs/${res.cid}/index.html?accessToken=${res.token}`);
        } else {
          setFullResponse(res);
          setOffset(0);
          setGallery(true);
        }
      }          
    } catch (error) {
      setSigning(false)
      alert(error.message)
    }    
  }

  const handleChangePage = async (dir) => { 
    let newOffset;   
    if(dir === "forward") {
      newOffset = offset + limit;      
      setOffset(newOffset);      
    } else {
      newOffset = offset - limit;
      if(newOffset < 0) {
        setOffset(0);   
        newOffset = 0;
      } else {
        setOffset(newOffset);
      }           
    }

    const res = await axios.post(`/api/content`, {
      accessToken: fullResponse.token, 
      gatewayURL: `${fullResponse.gateway}${fullResponse.childContent[0].uri}`, 
      offset: newOffset, 
      shortId: window.location.pathname.split("/")[1]
    });

    if(res.data.childContent.length === 0) {
      setOffset(newOffset - limit);
    } else {
      setFullResponse(res.data);
    }    
  }

  return (
    <div>
      {
        missing ? 
        <Missing /> :     
        <div>
{
        fileInfo && fileInfo.unlockInfo && fileInfo.unlockInfo.type === "retweet" ? 
        <RetweetLanding handleChangePage={handleChangePage} setGallery={setGallery} setFullResponse={setFullResponse} fullResponse={fullResponse} gallery={gallery} fileInfo={fileInfo} loading={loading} /> :
        fileInfo && fileInfo.unlockInfo && fileInfo.unlockInfo.blockchain && fileInfo.unlockInfo.blockchain === "Solana" ? 
        <Solana handleChangePage={handleChangePage} setGallery={setGallery} setFullResponse={setFullResponse} fullResponse={fullResponse} gallery={gallery} fileInfo={fileInfo} loading={loading} signing={signing} handleSign={handleSign} /> : 
        <Ethereum handleChangePage={handleChangePage} fullResponse={fullResponse} gallery={gallery} fileInfo={fileInfo} loading={loading} signing={signing} handleSign={handleSign} />
      }
        </div>
      }
      
    </div>
  );
}
