import React from "react";
import { getKy } from "../../helpers/ky";

interface UploadHandlerProps {
  setIpfsHash: (ipfsHash: string) => void;
}
const UploadHandler =
  (Component) =>
  // eslint-disable-next-line react/display-name
  ({ setIpfsHash, ...props }: UploadHandlerProps) => {
    const onFileChange = async (e) => {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        Object.assign(files[i], {
          preview: URL.createObjectURL(files[i]),
          formattedSize: files[i].size,
        });
      }
      const data = new FormData();
      data.append("file", files[0], files[0].name);
      const ky = getKy();
      const res = await ky.post(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/pinning/pinFileToIPFS`, {
        body: data,
      });
      const json = await res.json();
      setIpfsHash(json.IpfsHash);
    };
    return <Component {...props} onFileChange={onFileChange} />;
  };

export default UploadHandler;
