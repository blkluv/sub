import React from "react";
import { getKy } from "../../helpers/ky";

interface UploadHandlerProps {
  setIpfsHash: (ipfsHash: string) => void;
}
const UploadHandler =
  (Component) =>
  // eslint-disable-next-line react/display-name
  ({ setIpfsHash, ...props }: UploadHandlerProps) => {
    const onFileChange = async (e, setIsUploading) => {
      const file = e.target.files?.[0];
      console.log(URL.createObjectURL(file));
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
    return <Component {...props} onFileChange={onFileChange} />;
  };

export default UploadHandler;
