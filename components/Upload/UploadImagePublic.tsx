import { Button, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import shortUUID from "short-uuid";
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
    fileInput.current.value = null;
  };

  const id = shortUUID.generate();
  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id={id}
        multiple
        type="file"
        ref={fileInput}
        onChange={(e) => onFileChange(e, setIsUploading)}
      />

      <label htmlFor={id}>
        {!isUploading ? (
          <Button variant="outlined" component="span" disabled={isUploading}>
            {label}
          </Button>
        ) : (
          <CircularProgress />
        )}
      </label>
    </>
  );
};

export default UploadImagePublic;
