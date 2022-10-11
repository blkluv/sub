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
    <p className="mt-4 mb-4 text-md text-muted">
      Unlock this content by connecting your wallet to verify you have the required NFT.
    </p>
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
        <div className="inline-flex w-1/2">
          <WalletModalProvider className="fixed z-10 inset-0 overflow-y-auto inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 m-auto">
            {!wallet.connected ? (
              <WalletMultiButton className="w-full m-auto inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple" />
            ) : (
              <>
                <BaseLockType
                  description={description}
                  fileInfo={fileInfo}
                  lockName={"nft"}
                  handleVerify={signData}
                />
                <WalletDisconnectButton className="mt-4 w-full m-auto" />
              </>
            )}
          </WalletModalProvider>
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Solana;
