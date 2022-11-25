import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
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
  const dialogStyle = {
    "& .MuiDialog-paper": {
      width: "80%",
      maxWidth: "300px",
      margin: 0,
      borderRadius: "10px",
    },
    "& .MuiDialogTitle-root": {
      backgroundColor: "white",
      display: "flex",
      justifyContent: "space-between",
      height: "3rem",
      lineHeight: "1rem",
      "& .MuiIconButton-root": {
        flexShrink: 1,
        padding: "1rem",
        marginRight: "-1rem",
        color: "#d3d3d3",
      },
    },

    "& .MuiDialogContent-root": {
      padding: 0,
      "& .MuiCollapse-root": {
        "& .MuiList-root": {
          background: "white",
        },
      },
      "& .MuiList-root": {
        backgroundColor: "white",
        padding: 0,
      },
      "& .MuiListItem-root": {
        "&:hover": {
          boxShadow:
            "inset 0 1px 0 0 " +
            "rgba(255, 255, 255, 0.1)" +
            ", 0 1px 0 0 " +
            "rgba(255, 255, 255, 0.05)",
        },
        padding: "0.25rem",
        "& .MuiButton-endIcon": {
          margin: 0,
        },
        "& .MuiButton-root": {
          color: "#d3d3d3",
          backgroundColor: "#666666",
          flexGrow: 1,
          justifyContent: "center",
          padding: "1rem",
          width: "100%",
          "& .MuiButton-label": {
            justifyContent: "flex-start",
          },
          "& .MuiSvgIcon-root": {
            marginRight: "1rem",
          },
        },
      },
    },
  };
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider sx={{ ...dialogStyle }}>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaProvider;
