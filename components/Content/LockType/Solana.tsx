import { useWallet } from "@solana/wallet-adapter-react";
import BaseLockType from "./LockTypeContainer";
import bs58 from "bs58";
import { getKy } from "../../../helpers/ky";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
import { getMessagetoSign } from "../../../helpers/messageToSign";
import { Typography, Unstable_Grid2 as Grid2 } from "@mui/material";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useTheme } from "@emotion/react";
import { UnlockInfoSolana } from "../../../types/UnlockInfo";

const Solana = ({ fileInfo }: { fileInfo: MetadataUnlockInfo }) => {
  const { publicKey, signMessage } = useWallet();
  const signData = async (): Promise<SubmarinedContent> => {
    return new Promise(async (resolve, reject) => {
      const { shortId, submarineCID, unlockInfo } = fileInfo;
      if (unlockInfo.type === "nft") {
        // @ts-ignore
        const unlockInfoSolana: UnlockInfoSolana = unlockInfo;
        const { updateAuthority, blockchain, network, mintAddress } = unlockInfoSolana;
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

        const signatureRaw = signMessage && (await signMessage(message));
        if (!signatureRaw || !publicKey) {
          throw new Error("Signature is null");
        }
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

    maxWidth: "300px",
    borderRadius: 1000,
    ...(fileInfo?.customizations?.buttonShape === "square" && {
      borderRadius: 2,
    }),
    backgroundColor: theme.palette.primary.light,
    ...(fileInfo?.customizations?.buttonColor &&
      fileInfo?.customizations?.buttonColor?.hex && {
        backgroundColor: fileInfo.customizations.buttonColor.hex,
      }),
    color: "#000000",
    ...(fileInfo?.customizations?.buttonTextColor &&
      fileInfo?.customizations?.buttonTextColor.hex && {
        color: fileInfo.customizations.buttonTextColor.hex,
      }),
  };

  return !wallet.connected ? (
    <Grid2>
      {description}
      <Grid2 container direction={"column"} alignContent={"center"} gap={"1rem"}>
        <WalletMultiButton style={buttonStyle} />
        {wallet.autoConnect && <WalletDisconnectButton style={buttonStyle} />}
      </Grid2>
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
