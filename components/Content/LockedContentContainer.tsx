import LocationUnlock from "./LockType/Location";
import Solana from "./LockType/Solana";
import NFT from "./LockType/NFT";
import Retweet from "./LockType/Retweet";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import { BlockchainOptions, UnlockInfo } from "../../types/UnlockInfo";
import WagmiProvider from "../Wagmi/Provider";
import { Box, Container, Paper, Typography, Unstable_Grid2 } from "@mui/material";
import ThumbnailImage from "../Form/ThumbnailImage";
import SolanaProvider from "./LockType/SolanaProvider";

export const EVMChains = ["Ethereum", "Polygon", "Avalanche"];
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
        {LockType}
      </Paper>
    </Container>
  );
};

export default LockedContentContainer;
