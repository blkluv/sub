import React from "react";
import NFT from "../../components/Submarine/SelectLockType/NFT";
import SubmarineFileForm from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import { BlockchainOptions, UnlockInfoNFT } from "../../types/UnlockInfo";
import * as Yup from "yup";
import { ethers } from "ethers";

const Nft = () => {
  const unlockInfoSchema = Yup.object().shape({
    network: Yup.string().required("Required"),
    tokenId: Yup.number().required("Required").typeError("Token id must be a number"),
    contract: Yup.string()
      .required("Required")
      .test("address-is-valid", "Not a valid address.", (value) => ethers.utils.isAddress(value)),
    // mintAddress: Yup.string().required("Required"),
    // updateAuthority: Yup.string().required("Required"),
  });

  const unlockInfo: UnlockInfoNFT = {
    type: "nft",
    blockchain: BlockchainOptions.Ethereum,
    tokenId: "",
    network: "",
    contract: "",
    mintAddress: "",
    updateAuthority: "",
  };
  return (
    <SubmarineFileForm unlockInfo={unlockInfo} unlockInfoSchema={unlockInfoSchema}>
      <NFT />
    </SubmarineFileForm>
  );
};

export default Nft;
