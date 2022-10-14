import Image from "next/future/image";
import React from "react";
import LocationUnlock from "./LockType/Location";
import Solana from "./LockType/Solana";
import NFT from "./LockType/NFT";
import Retweet from "./LockType/Retweet";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import { UnlockInfo } from "../../types/UnlockInfo";
import WagmiProvider from "../Wagmi/Provider";
import { Container, Paper, Typography } from "@mui/material";

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
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: (theme) => theme.spacing(4),
        }}
      >
        {fileInfo?.thumbnail?.length > 0 && typeof fileInfo.thumbnail === "string" ? (
          <Image
            className="mb-8 mt-6 w-24 h-24 m-auto rounded-full"
            src={`${gatewayUrl}/ipfs/${fileInfo.thumbnail}`}
            alt={`${fileInfo.name} preview`}
            width={100}
            height={100}
          />
        ) : (
          fileInfo?.thumbnail?.length > 0 && (
            <Image
              className="mb-8 mt-6 w-24 h-24 m-auto rounded-full"
              src={fileInfo?.thumbnail && fileInfo?.thumbnail[0]}
              alt={`${fileInfo.name} preview`}
              width={100}
              height={100}
            />
          )
        )}
        <Typography
          variant="h1"
          fontWeight="bold"
          fontSize={52}
          sx={{ padding: (theme) => theme.spacing(1) }}
        >
          {fileInfo.name}
        </Typography>
        <Typography variant="h4" fontSize={22}>
          {fileInfo.description}
        </Typography>
        {LockType}
      </Paper>
    </Container>
  );
};

export default LockedContentContainer;
