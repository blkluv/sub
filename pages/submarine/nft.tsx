import React from "react";
import NFT from "../../components/Submarine/SelectLockType/NFT";
import SubmarineFileForm from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import { BlockchainOptions, UnlockInfoNFT } from "../../types/UnlockInfo";
import * as Yup from "yup";
import { ethers } from "ethers";

const Nft = () => {
  const EVMChain = ["Ethereum", "Polygon", "Avalance"];
  const SolanaChain = "Solana";

  const unlockInfoSchema = Yup.object().shape({
    blockchain: Yup.string().required("Required"),
    network: Yup.string().required("Required"),
    tokenId: Yup.number().when("blockchain", {
      is: (blockchain) => EVMChain.includes(blockchain),
      then: Yup.number().required("Required").typeError("Token id must be a number"),
    }),
    contract: Yup.string().when("blockchain", {
      is: (blockchain) => EVMChain.includes(blockchain),
      then: Yup.string()
        .required("Required")
        .test("address-is-valid", "Not a valid address.", (value) => ethers.utils.isAddress(value)),
    }),
    mintAddress: Yup.string().when("blockchain", {
      is: (blockchain) => SolanaChain === blockchain,
      then: Yup.string()
        .required("Required")
        .min(32, "Not a valid address.")
        .max(44, "Not a valid address."),
    }),
    updateAuthority: Yup.string().when("blockchain", {
      is: (blockchain) => SolanaChain === blockchain,
      then: Yup.string().required("Required"),
    }),
  });

  const unlockInfo: UnlockInfoNFT = {
    type: "nft",
    blockchain: BlockchainOptions.Ethereum,
    network: "",
    tokenId: "",
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
