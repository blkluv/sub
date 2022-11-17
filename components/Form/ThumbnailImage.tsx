import Image from "next/image";

const ThumbnailImage = ({ gatewayUrl, thumbnail }) => {
  if (!thumbnail) {
    return <Image height={70} width={70} src="/submarine.png" alt="Submarine Me" />;
  }
  let url;
  if (thumbnail.includes("blob:")) {
    url = thumbnail;
  } else {
    url = `${gatewayUrl}/ipfs/${thumbnail}`;
  }
  return <Image src={url} height={56} width={56} alt="preview for thumbnail" />;
};

export default ThumbnailImage;
