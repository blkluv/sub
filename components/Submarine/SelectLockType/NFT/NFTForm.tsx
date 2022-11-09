import { useFormikContext } from "formik";
import NetworkSelector from "./NetworkSelector";
import { MetadataUnlockInfo } from "../SubmarineFileForm";
import ContractAddress from "./ContractAddress";
import BlockchainSelector from "./BlockchainSelector";
import { Typography, Unstable_Grid2 } from "@mui/material";

const NFTForm = () => {
  const { values } = useFormikContext<MetadataUnlockInfo>();
  const unlockInfo = values.unlockInfo.type === "nft" ? values.unlockInfo : null;

  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em", marginTop: "2em" }}>
      <Typography variant="h5">NFT Details</Typography>
      <BlockchainSelector />
      {unlockInfo.blockchain && <NetworkSelector blockchain={unlockInfo.blockchain} />}
      {unlockInfo.blockchain && unlockInfo.network && (
        <ContractAddress blockchain={unlockInfo.blockchain} />
      )}
    </Unstable_Grid2>
  );
};

export default NFTForm;
