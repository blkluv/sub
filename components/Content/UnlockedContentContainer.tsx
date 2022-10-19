import React, { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectSubmarinedContent } from "../../store/selectors/submarinedContentSelectors";
import { useState } from "react";
import Gallery from "./Gallery";
import VideoWrapper from "./MediaWrappers/VideoWrapper";
import Image from "next/image";
import mime from "mime-types"

const UnlockedContentContainer = ({ name }) => {
  const submarinedContent = useAppSelector(selectSubmarinedContent);
  const [fileType, setFileType] = useState<string>("")
  const url = `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}?accessToken=${submarinedContent.token}`;
  

  useEffect(() => {
    findFileType()
  }, [fileType]);

  const findFileType = async() => {
    if(!submarinedContent.directory){
      // const req = await fetch(url, {method:'HEAD'});
      // const content_type = req.headers.get('content-type');
      const content_type = mime.contentType(submarinedContent.originalName)
      if(content_type){
        if(content_type.includes("image")){
          setFileType("image")
        }
        if(content_type.includes("video")){
          setFileType("video")
        }
        if(content_type.includes("audio")){
          setFileType("audio")
        } 
        console.log(content_type)
      }
    }
   }

  if (submarinedContent.directory) {
    return <Gallery name={name} content={submarinedContent} />;
  }
  return (
    <div>
      <h1>{name}</h1>
      <div  style={{ position: "relative", width: "100%", paddingBottom: "50%" }}>
          {fileType == "image" && <Image src={url} alt={name} layout="fill" objectFit="contain"/>}
          {fileType == "video" && <VideoWrapper url={url}/>}
          {fileType == "audio" && <audio src={url} controls><p>Your browser does not support the audio element.</p></audio>}
      </div> 
    </div>
  );
};

export default UnlockedContentContainer;
