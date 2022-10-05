import React from "react";
import FileDetail from "../FileDetail";
import { useFormikContext } from "formik";
import BlockchainSelector from "./BlockchainSelector";
import NetworkSelector from "./NetworkSelector";
import { MetadataUnlockInfo } from "../SubmarineFileForm";
import ContractAddress from "./ContractAddress";

const NFTForm = () => {
  const { values } = useFormikContext<MetadataUnlockInfo>();
  const unlockInfo = values.unlockInfo.type === "nft" ? values.unlockInfo : null;

  return (
    <div>
      <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <BlockchainSelector />
        {unlockInfo.blockchain && <NetworkSelector blockchain={unlockInfo.blockchain} />}
        {unlockInfo.blockchain && unlockInfo.network && (
          <ContractAddress blockchain={unlockInfo.blockchain} />
        )}
      </div>
    </div>
  );
};

export default NFTForm;
