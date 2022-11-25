import { useWallet } from "@solana/wallet-adapter-react";
import BaseLockType from "./LockTypeContainer";
import bs58 from "bs58";
import { getKy } from "../../../helpers/ky";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
import { getMessagetoSign } from "../../../helpers/messageToSign";
import { Button, createTheme, Divider, Typography, Unstable_Grid2 as Grid2 } from "@mui/material";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import { ThemeProvider } from "@mui/material";
const Solana = ({ fileInfo }: { fileInfo: MetadataUnlockInfo }) => {
  const { publicKey, signMessage } = useWallet();
  const signData = async (): Promise<SubmarinedContent> => {
    return new Promise(async (resolve, reject) => {
      const { shortId, submarineCID, unlockInfo } = fileInfo;
      if (unlockInfo.type === "nft") {
        const { updateAuthority, blockchain, tokenId, network, mintAddress } = unlockInfo;
        const ky = getKy();
        const messageToSign: {
          id: string;
          created_at?: string;
          contract?: string;
          shortId?: string;
          updateAuthority?: string;
          used: boolean;
        } = await ky.get(`/api/verifySol?updateAuthority=${updateAuthority}`).json();

        const fullMessage = getMessagetoSign(messageToSign.updateAuthority, messageToSign.id);
        const message = new TextEncoder().encode(fullMessage);
        if (!signMessage) {
          reject("Wallet does not support message signing!");
        }

        const signatureRaw = await signMessage(message);
        const signature = bs58.encode(signatureRaw);

        const data: SubmarinedContent = await ky
          .post("/api/verifySol", {
            json: {
              address: publicKey.toString(),
              signature,
              network,
              updateAuthority,
              mintAddress,
              blockchain,
              tokenId,
              CID: submarineCID,
              shortId: shortId,
              message: messageToSign,
            },
          })
          .json();
        resolve(data);
      } else {
        reject('Unlock type is not "nft"');
      }
    });
  };
  const wallet = useWallet();
  const description = (
    <Typography
      variant="h6"
      sx={{
        padding: (theme) => theme.spacing(1),
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      Connect your wallet to unlock content
    </Typography>
  );

  const theme = useTheme();
  const buttonStyle = {
    width: "90%",
    marginTop: "0.5em",
    padding: theme.spacing(1),
    color: "black",
    backgroundColor: theme.palette.primary.light,
  };

  return !wallet.connected ? (
    <Grid2>
      <Grid2 container direction={"column"} alignContent={"center"}>
        <WalletMultiButton style={buttonStyle} />
        {wallet.autoConnect && <WalletDisconnectButton style={buttonStyle} />}
      </Grid2>
      {description}
    </Grid2>
  ) : (
    <>
      <BaseLockType
        description={description}
        fileInfo={fileInfo}
        lockName={"nft"}
        handleVerify={signData}
      />
      <WalletDisconnectButton />
    </>
  );
};

export default Solana;
