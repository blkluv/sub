import NFT from "../../components/Submarine/SelectLockType/NFT";
import SubmarineFileForm from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import { BlockchainOptions, UnlockInfoNFT } from "../../types/UnlockInfo";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import ContractAddressETH from "../../components/Submarine/SelectLockType/NFT/ETH/ContractAddress";
import ContractAddressSolana from "../../components/Submarine/SelectLockType/NFT/Solana/ContractAddress";

const Nft = () => {
  // implementation differs based on the blockchain selected.
  // since we are outside Formik state here, we need to useState.
  const [blockchain, setBlockchain] = useState(BlockchainOptions.Ethereum);

  const [unlockInfo, setUnlockInfo] = useState<UnlockInfoNFT>(ContractAddressETH.unlockInfo);
  const [unlockInfoSchema, setUnlockInfoSchema] = useState(ContractAddressETH.unlockInfoSchema);

  type ContractAddressType = React.FC & { unlockInfoSchema: Yup.ObjectSchema<any> } & {
    unlockInfo: UnlockInfoNFT;
  };
  const [ContractAddress, setContractAddress] = useState<ContractAddressType>(
    () => ContractAddressETH
  );

  useEffect(() => {
    switch (blockchain) {
      case BlockchainOptions.Solana:
        setContractAddress(() => ContractAddressSolana);
        break;
      default:
        setContractAddress(() => ContractAddressETH);
        break;
    }
  }, [blockchain]);

  useEffect(() => {
    setUnlockInfo(ContractAddress.unlockInfo);
    setUnlockInfoSchema(ContractAddress.unlockInfoSchema);
  });

  return (
    <SubmarineFileForm unlockInfo={unlockInfo} unlockInfoSchema={unlockInfoSchema}>
      <NFT setBlockchain={setBlockchain}>
        <ContractAddress />
      </NFT>
    </SubmarineFileForm>
  );
};

export default Nft;
