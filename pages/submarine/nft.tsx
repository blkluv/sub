import React from "react";
import NFT from "../../components/Submarine/SelectLockType/NFT";
import SubmarineFileForm, {
  MetadataUnlockInfo,
} from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import { BlockchainOptions, UnlockInfoNFT } from "../../types/UnlockInfo";
import * as Yup from "yup";

const Nft = () => {
  // const canSubmit = (values: MetadataUnlockInfo) => {
  //   const unlockInfo = values.unlockInfo as UnlockInfoNFT;
  //   // TODO this ok?
  //   return !!((unlockInfo.contract || unlockInfo.updateAuthority) && unlockInfo.network);
  // };

  //TO DO: check address is valid according to the network (library for this?)
  // const contractRegex = (contract: string, network: string) => {
  //   console.log(contract, network);
  //   return true;
  // };

  const unlockInfoSchema = Yup.object().shape({
    network: Yup.string().required("Required"),
    tokenId: Yup.number().required("Required").typeError("Token id must be a number"),
    contract: Yup.string().required("Required"),
    // .test("address-format-is-valid", "Address format not valid", (value) =>
    //   contractRegex(value, unlockInfoSchema.network)
    // )
    mintAddress: Yup.string().required("Required"),
    updateAuthority: Yup.string().required("Required"),
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
