import React from "react";
import LockTypeContainer from "../LockTypeContainer";
import NFTForm from "./NFTForm";

const NFT = () => {
  const description = "Allow content to be unlocked with ownership of an NFT.";
  const title = "NFT Ownership";
  return (
    <LockTypeContainer title={title} description={description}>
      <NFTForm />
    </LockTypeContainer>
  );
};

export default NFT;
