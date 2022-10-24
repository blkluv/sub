import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React, { useMemo } from "react";
import BaseLockType from "./LockTypeContainer";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import bs58 from "bs58";
import { useAppDispatch } from "../../../store/hooks";
import { setAlert } from "../../../store/slices/alertSlice";
import { getKy } from "../../../helpers/ky";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
import { getMessagetoSign } from "../../../helpers/messageToSign";
import { Button, Typography, Unstable_Grid2 as Grid2 } from "@mui/material";

const Solana = ({ fileInfo }: { fileInfo: MetadataUnlockInfo }) => {
  const { publicKey, signMessage } = useWallet();
  const dispatch = useAppDispatch();
  const signData = async (): Promise<SubmarinedContent | void> => {
    try {
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
          dispatch(
            setAlert({ message: "Wallet does not support message signing!", type: "error" })
          );
          return;
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
        return data;
      }
    } catch (error) {
      throw error;
    }
  };
  const wallet = useWallet();
  const description = (
    <Typography>
      Unlock this content by connecting your wallet to verify you have the required NFT.
    </Typography>
  );

  // TODO
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.

  // TODO do we need all of this???
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {!wallet.connected ? (
            <Grid2>
              <Button>
                <WalletMultiButton />
              </Button>
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
          )}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Solana;
