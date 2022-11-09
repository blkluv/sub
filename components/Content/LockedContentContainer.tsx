import Image from "next/future/image";
import React from "react";
import LocationUnlock from "./LockType/Location";
import Solana from "./LockType/Solana";
import NFT from "./LockType/NFT";
import Retweet from "./LockType/Retweet";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import { UnlockInfo } from "../../types/UnlockInfo";
import WagmiProvider from "../Wagmi/Provider";
import { Box, Container, Paper, Typography, Unstable_Grid2 } from "@mui/material";

export const EVMChains = ["Ethereum", "Polygon", "Avalanche"];
interface LockedContentContainerProps {
  fileInfo: MetadataUnlockInfo;
  gatewayUrl: string;
}
const LockedContentContainer = ({ fileInfo, gatewayUrl }: LockedContentContainerProps) => {
  const getLockType = (unlockInfo: UnlockInfo) => {
    const type = unlockInfo.type;
    switch (type) {
      case "location":
        return <LocationUnlock fileInfo={fileInfo} />;
      case "nft":
        if (unlockInfo.blockchain === "Solana") {
          return <Solana fileInfo={fileInfo} />;
        } else if (EVMChains.includes(unlockInfo.blockchain)) {
          return (
            <WagmiProvider>
              <NFT fileInfo={fileInfo} />
            </WagmiProvider>
          );
        }
      case "retweet":
        return <Retweet fileInfo={fileInfo} />;
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
          {!fileInfo?.thumbnail?.length && (
            <Image height={70} width={70} src="/submarine.png" alt="Submarine Me" />
          )}
          {fileInfo?.thumbnail?.length > 0 && typeof fileInfo.thumbnail === "string" ? (
            <Image
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "1000px",
              }}
              src={`${gatewayUrl}/ipfs/${fileInfo.thumbnail}`}
              alt={`${fileInfo.name} preview`}
              width={70}
              height={70}
            />
          ) : (
            fileInfo?.thumbnail?.length > 0 && (
              <Image
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "1000px",
                  margin: "auto",
                  marginBottom: "1rem",
                }}
                src={fileInfo?.thumbnail && fileInfo?.thumbnail[0]}
                alt={`${fileInfo.name} preview`}
                width={70}
                height={70}
              />
            )
          )}
        </Box>
        <Typography
          variant="h1"
          sx={{
            marginTop: (theme) => theme.spacing(3),
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          {fileInfo.name}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            padding: (theme) => theme.spacing(1),
            color: (theme) => theme.palette.primary.contrastText,
            opacity: ".75",
          }}
        >
          {fileInfo.description}
        </Typography>
        {LockType}
      </Paper>
    </Container>
  );
};

export default LockedContentContainer;
