import React from "react";
import LockTypeContainer from "../LockTypeContainer";
import NFTForm from "./NFTForm";

const NFT = () => {
  const description =
    "Provide details about the NFT to be used to unlock the content, and anyone trying to access your file will not be able to access it unless they own the NFT specified.";
  const title = "Allow content to be unlocked with ownership of an NFT";
  return (
    <LockTypeContainer title={title} description={description}>
      <NFTForm />
    </LockTypeContainer>
  );
};

export default NFT;
