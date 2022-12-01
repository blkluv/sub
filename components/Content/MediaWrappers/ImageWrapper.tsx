import { Unstable_Grid2 } from "@mui/material";
import Image from "next/image";

export interface ImageWrapperProps {
  url: string;
  orginialname: string;
}

const ImageWrapper = ({ url, orginialname }: ImageWrapperProps) => {
  return <Image src={url} alt={orginialname} layout="fill" objectFit="contain" />;
};

export default ImageWrapper;
