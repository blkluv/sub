import EmbeddedPlayer from "./MediaWrappers/EmbeddedPlayer";
import { useEffect, useState } from "react";
import mime from "mime-types";
import { SubmarinedContent } from "../../types/SubmarinedContent";
import ImageWrapper from "./MediaWrappers/ImageWrapper";
import { Box } from "@mui/material";
import DownloadFile from "./MediaWrappers/DownloadFile";
export interface SingleMediaDisplayProps {
  url: string;
  submarinedContent: SubmarinedContent;
}

const SingleMediaDisplay = ({ url, submarinedContent }: SingleMediaDisplayProps) => {
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
    <Box
      sx={{
        position: "relative",
        height: "70vh",
        width: "70vw",
      }}
    >
      {fileType == "video" || fileType == "audio" ? (
        <EmbeddedPlayer url={url} />
      ) : fileType == "image" ? (
        <ImageWrapper url={url} orginialname={submarinedContent.originalname} />
      ) : (
        <DownloadFile url={url} />
      )}
    </Box>
  );
};

export default SingleMediaDisplay;
