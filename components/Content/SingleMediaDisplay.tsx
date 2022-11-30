import EmbeddedPlayer from "./MediaWrappers/EmbeddedPlayer";
import Image from "next/image";
import { useEffect, useState } from "react";
import mime from "mime-types";
import { SubmarinedContent } from "../../types/SubmarinedContent";
import ImageWrapper from "./MediaWrappers/ImageWrapper";
export interface SingleMediaDisplayProps {
  url: string;
  submarinedContent: SubmarinedContent;
  name: string;
}

const SingleMediaDisplay = ({ url, submarinedContent, name }: SingleMediaDisplayProps) => {
  const [fileType, setFileType] = useState<string>("");

  useEffect(() => {
    findFileType();
  }, [fileType]);

  const findFileType = async () => {
    const content_type = mime.lookup(submarinedContent.originalname.trim());
    if (content_type) {
      if (content_type.includes("image")) {
        setFileType("image");
      }
      if (content_type.includes("video")) {
        setFileType("video");
      }
      if (content_type.includes("audio")) {
        setFileType("audio");
      }
    }
  };
  return (
    <div>
      <h2 className="text-xl font-sans font-bold sm:my-4 my-6">{name}</h2>
      <div>
        {fileType == "video" || fileType == "audio" ? (
          <EmbeddedPlayer url={url} />
        ) : (
          <ImageWrapper url={url} orginialname={submarinedContent.originalname} />
        )}
      </div>
    </div>
  );
};

export default SingleMediaDisplay;
