import { Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import UploadHandler from "./UploadHandler";

const UploadThumbnail = ({ onFileChange }) => {
  const fileInput = useRef(null);

  const [isUploading, setIsUploading] = useState(false);
  if (isUploading) {
    return <div>Uploading...</div>;
  }

  return (
    <Button type="button" variant="outlined">
      <Typography color="primary.main">Select a thumbnail image</Typography>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
        accept=".png, .jpeg, .jpg, .gif"
        ref={fileInput}
        onChange={(e) => onFileChange(e, setIsUploading)}
      />
    </Button>
  );
};

export default UploadHandler(UploadThumbnail);
