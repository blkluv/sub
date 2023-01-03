import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import { UnlockInfo } from "../../types/UnlockInfo";
import { Box, Container, Paper, Typography, Unstable_Grid2 } from "@mui/material";
import ThumbnailImage from "../Form/ThumbnailImage";
import React, { Suspense } from "react";

export const EVMChains = ["Ethereum", "Polygon", "Avalanche"];

const LocationUnlock = React.lazy(() => import("./LockType/Location"));
const Solana = React.lazy(() => import("./LockType/Solana"));
const SolanaProvider = React.lazy(() => import("./LockType/SolanaProvider"));
const WagmiProvider = React.lazy(() => import("../Wagmi/Provider"));
const NFT = React.lazy(() => import("./LockType/NFT"));
const Retweet = React.lazy(() => import("./LockType/Retweet"));

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
        if (unlockInfo.blockchain === "Solana") {
          return (
            <SolanaProvider>
              <Solana fileInfo={fileInfo} />
            </SolanaProvider>
          );
        } else if (EVMChains.includes(unlockInfo.blockchain)) {
          return (
            <WagmiProvider>
              <NFT fileInfo={fileInfo} />
            </WagmiProvider>
          );
        }
      case "retweet":
        return <Retweet fileInfo={fileInfo} isPreview={isPreview} />;
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
            marginTop: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          {fileInfo.name || "Title"}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            padding: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.primary.contrastText,
            opacity: ".75",
          }}
        >
          {fileInfo.description || "Description"}
        </Typography>
        <Suspense fallback={<div> loading...</div>}>{LockType}</Suspense>
      </Paper>
    </Container>
  );
};

export default LockedContentContainer;
