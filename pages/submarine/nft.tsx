import React from "react";
import NFT from "../../components/Submarine/SelectLockType/NFT";
import SubmarineFileForm from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import { BlockchainOptions, UnlockInfoNFT } from "../../types/UnlockInfo";
import * as Yup from "yup";
import { ethers } from "ethers";

const Nft = () => {
  const unlockInfoSchema = Yup.object().shape({
    network: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    value2: Yup.string().required("Required"),
  });

  const unlockInfo: UnlockInfoNFT = {
    type: "nft",
    blockchain: BlockchainOptions.Ethereum,
    network: "",
    address: "",
    value2: "",
  };
  return (
    <SubmarineFileForm unlockInfo={unlockInfo} unlockInfoSchema={unlockInfoSchema}>
      <NFT />
    </SubmarineFileForm>
  );
};

export default Nft;
