import Image from "next/image";

export interface ImageWrapperProps {
  url: string;
  orginialname: string;
}

const ImageWrapper = ({ url, orginialname }: ImageWrapperProps) => {
  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "60%" }}>
      <Image src={url} alt={orginialname} layout="fill" objectFit="contain" />
    </div>
  );
};

export default ImageWrapper;
