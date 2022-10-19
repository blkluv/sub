import EmbeddedPlayer from "./MediaWrappers/EmbeddedPlayer"
import Image from "next/image"
import { useEffect, useState } from "react";
import mime from "mime-types"
import { SubmarinedContent } from "../../types/SubmarinedContent";

export interface SingleMediaDisplayProps {
  url: string, 
  submarinedContent: SubmarinedContent
}

const SingleMediaDisplay = ({url, submarinedContent}: SingleMediaDisplayProps) => {
    const [fileType, setFileType] = useState<string>("")
  
    useEffect(() => {
      console.log(fileType)
        findFileType()
        console.log("Submarined Content", submarinedContent)
      }, [fileType]);
    
      const findFileType = async() => {
          const content_type = mime.lookup(submarinedContent.originalname.trim())
          console.log("Content type", content_type)
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
    return (
        <div>
        <div style={{ position: "relative", width: "100%", paddingBottom: "50%" }}>
          {fileType == "video" || fileType == "audio" ? 
            <EmbeddedPlayer fileType={fileType} url={url}/>
            :
            <Image src={url} alt="" layout="fill" objectFit="contain"/>
          }
        </div> 
      </div>
        
    )
}

export default SingleMediaDisplay
