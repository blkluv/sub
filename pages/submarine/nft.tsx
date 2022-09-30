import React from "react";
import NFT from "../../components/Submarine/SelectLockType/NFT";
import SubmarineFileForm, {
  MetadataUnlockInfo,
} from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import { BlockchainOptions, UnlockInfoNFT } from "../../types/UnlockInfo";

const Nft = () => {
  const canSubmit = (values: MetadataUnlockInfo) => {
    const unlockInfo = values.unlockInfo as UnlockInfoNFT;
    // TODO this ok?
    return !!((unlockInfo.contract || unlockInfo.updateAuthority) && unlockInfo.network);
  };

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
    <SubmarineFileForm canSubmit={canSubmit} unlockInfo={unlockInfo}>
      <NFT />
    </SubmarineFileForm>
  );
};

export default Nft;
