import React, { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectSubmarinedContent } from "../../store/selectors/submarinedContentSelectors";
import { useState } from "react";
import Gallery from "./Gallery";
import VideoWrapper from "./MediaWrappers/VideoWrapper";
import Image from "next/image";

const UnlockedContentContainer = ({ name }) => {
  const submarinedContent = useAppSelector(selectSubmarinedContent);
  const [fileType, setFileType] = useState<string>("")
  const url = `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}?accessToken=${submarinedContent.token}`;

  
  useEffect(() => {
    findFileType()
  }, [fileType]);

  const findFileType = async() => {
    if(!submarinedContent.directory){
      const req = await fetch(url, {method:'HEAD'});
      const content_type = req.headers.get('content-type');
      if(content_type.includes("image")){
        setFileType("image")
      }
      if(content_type.includes("video")){
        setFileType("video")
      }
      console.log(content_type)
    }
  }

  if (submarinedContent.directory) {
    return <Gallery name={name} content={submarinedContent} />;
  }
  return (
    <div>
      {fileType == "image" && <Image src={url} alt="" width={300} height={300}/>}
      {fileType == "video" && <VideoWrapper url={url}/>}
    </div>
  );
};

export default UnlockedContentContainer;
