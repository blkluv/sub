import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import { BlockchainOptions, UnlockInfo } from "../../types/UnlockInfo";
import { Box, Container, Paper, Typography } from "@mui/material";
import ThumbnailImage from "../Form/ThumbnailImage";
import FlowUnlock from "./LockType/Flow";
import Twitch from "./LockType/Twitch";

export const EVMChains = ["Ethereum", "Polygon", "Avalanche"];

import dynamic from "next/dynamic";
const LocationUnlock = dynamic(() => import("./LockType/Location"));
const Solana = dynamic(() => import("./LockType/Solana"));
const SolanaProvider = dynamic(() => import("./LockType/SolanaProvider"));
const WagmiProvider = dynamic(() => import("../Wagmi/Provider"));
const NFT = dynamic(() => import("./LockType/NFT"), { ssr: false }); // useConnect() hook is not SSR compatible
const Retweet = dynamic(() => import("./LockType/Retweet"));

interface LockedContentContainerProps {
  fileInfo: MetadataUnlockInfo;
  gatewayUrl: string;
  isPreview: boolean;
}
const LockedContentContainer = ({
  fileInfo,
  gatewayUrl,
  isPreview,
}: LockedContentContainerProps) => {
  const getLockType = (unlockInfo: UnlockInfo) => {
    const type = unlockInfo.type;
    switch (type) {
      case "location":
        return <LocationUnlock fileInfo={fileInfo} />;
      case "nft":
        if (unlockInfo.blockchain === BlockchainOptions.Solana) {
          return (
            <SolanaProvider>
              <Solana fileInfo={fileInfo} />
            </SolanaProvider>
          );
        } else if (unlockInfo.blockchain === BlockchainOptions.Flow) {
          return <FlowUnlock fileInfo={fileInfo} />;
        } else if (EVMChains.includes(unlockInfo.blockchain)) {
          return (
            <WagmiProvider>
              <NFT fileInfo={fileInfo} />
            </WagmiProvider>
          );
        }
      case "retweet":
        return <Retweet fileInfo={fileInfo} isPreview={isPreview} />;
      case "twitch":
        return <Twitch fileInfo={fileInfo} />;

      default:
        return <div>Unknown lock type</div>;
    }
  };

  const LockType = getLockType(fileInfo.unlockInfo);
  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "70px",
          marginBottom: "20px",
          padding: (theme) => theme.spacing(4),
          backgroundColor: (theme) => theme.palette.primary.dark,
          opacity: "0.9",
          borderRadius: "48px",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            marginTop: "-50px",
          }}
        >
          <ThumbnailImage gatewayUrl={gatewayUrl} thumbnail={fileInfo.thumbnail} />
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontFamily: "inherit",
            marginTop: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          {fileInfo.name || "Title"}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "inherit",
            padding: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.primary.contrastText,
            opacity: ".75",
          }}
        >
          {fileInfo.description || "Description"}
        </Typography>
        {LockType}
      </Paper>
    </Container>
  );
};

export default LockedContentContainer;
