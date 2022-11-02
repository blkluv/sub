import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { getKy } from "../../helpers/ky";

const UploadImagePublic = ({ setIpfsHash, label }) => {
  const fileInput = useRef(null);

  const [isUploading, setIsUploading] = useState(false);

  const onFileChange = async (e, setIsUploading) => {
    const file = e.target.files?.[0];
    setIpfsHash(URL.createObjectURL(file));
    const data = new FormData();
    data.append("file", file, file.name);
    const ky = getKy();
    setIsUploading(true);
    const res = await ky.post(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/pinning/pinFileToIPFS`, {
      body: data,
    });
    const json = await res.json();
    setIsUploading(false);
    setIpfsHash(json.IpfsHash);
  };

  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id={`button-file-${label}`}
        multiple
        type="file"
        ref={fileInput}
        onChange={(e) => onFileChange(e, setIsUploading)}
      />

      <label htmlFor={`button-file-${label}`}>
        <Button size="small" variant="outlined" component="span">
          {!isUploading ? label : "Uploading"}
        </Button>
      </label>
    </>
  );
};

export default UploadImagePublic;
