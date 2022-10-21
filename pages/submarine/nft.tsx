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
  const contractRegex = (contract: string, network: string) => {
    console.log(contract, network);
    return true;
  };

  //TO DO - finish this schema
  const unlockInfoSchema = Yup.object().shape({
    network: Yup.string().required("Network is required"),
    tokenId: Yup.number().required("Distance is required").typeError("Value not valid."),
    contract: Yup.string()
      .required("Distance is required")
      .test("address-format-is-valid", "Address format not valid", (value) =>
        contractRegex(value, unlockInfoSchema.network)
      ),
    // mintAddress:
    // updateAuthority:
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
