import LockTypeContainer from "../LockTypeContainer";
import { useFormikContext } from "formik";
import { MetadataUnlockInfo } from "../SubmarineFileForm";
import BlockchainSelector from "./BlockchainSelector";
import { Typography, Unstable_Grid2 } from "@mui/material";
import { BlockchainOptions } from "../../../../types/UnlockInfo";
import NetworkSelector from "./NetworkSelector";
import React from "react";
interface NFTProps {
  setBlockchain: (blockchain: BlockchainOptions) => void;
  children: React.ReactNode;
}
const NFT = ({ setBlockchain, children }: NFTProps) => {
  const description = "Allow content to be unlocked with ownership of an NFT.";
  const title = "NFT Ownership";

  const { values } = useFormikContext<MetadataUnlockInfo>();
  const unlockInfo = values.unlockInfo.type === "nft" ? values.unlockInfo : null;

  return (
    <LockTypeContainer title={title} description={description}>
      <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em", marginTop: "2em" }}>
        <Typography variant="h5">NFT Details</Typography>
        <BlockchainSelector setBlockchain={setBlockchain} />
        {unlockInfo.blockchain && <NetworkSelector blockchain={unlockInfo.blockchain} />}
        <Unstable_Grid2>{unlockInfo.blockchain && unlockInfo.network && children}</Unstable_Grid2>
      </Unstable_Grid2>
    </LockTypeContainer>
  );
};

export default NFT;
