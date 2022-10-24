import { useFormikContext } from "formik";
import NetworkSelector from "./NetworkSelector";
import { MetadataUnlockInfo } from "../SubmarineFileForm";
import ContractAddress from "./ContractAddress";
import BlockchainSelector from "./BlockchainSelector";

const NFTForm = () => {
  const { values } = useFormikContext<MetadataUnlockInfo>();
  const unlockInfo = values.unlockInfo.type === "nft" ? values.unlockInfo : null;

  return (
    <>
      <BlockchainSelector />
      {unlockInfo.blockchain && <NetworkSelector blockchain={unlockInfo.blockchain} />}
      {unlockInfo.blockchain && unlockInfo.network && (
        <ContractAddress blockchain={unlockInfo.blockchain} />
      )}
    </>
  );
};

export default NFTForm;
