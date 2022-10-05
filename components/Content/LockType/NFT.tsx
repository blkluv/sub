import React from "react";
import { getKy } from "../../../helpers/ky";

import { Provider, chain, defaultChains, useConnect, useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import BaseLockType from "./LockTypeContainer";

const infuraId = process.env.NEXTJS_PUBLIC_INFURA_ID;

const chains = defaultChains;
const NFT = ({ fileInfo }) => {
  const [{ data, error }, connect] = useConnect();

  const [{ data: accountData, error: accountError, loading: accountLoading }, disconnect] =
    useAccount();
  const connectors = ({ chainId }) => {
    const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0];
    return [
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
      new WalletConnectConnector({
        options: {
          infuraId,
          qrcode: true,
        },
      }),
      new WalletLinkConnector({
        options: {
          appName: "My wagmi app",
          jsonRpcUrl: `${rpcUrl}/${infuraId}`,
        },
      }),
    ];
  };
  const handleSign = async () => {
    try {
      if (fileInfo.unlockInfo.type === "nft") {
        if (fileInfo.unlockInfo.blockchain === "Solana") {
          // const url = await signDataSol(fileInfo); // TODO fix this
          // if (url) {
          //   setSigning(false);
          //   window.location.replace(url);
          // }
        } else {
          const { shortId, submarineCID, unlockInfo } = fileInfo;
          const { contract, blockchain, tokenId, network } = unlockInfo;
          const ky = getKy();
          const messageToSign = await ky.get(`/api/verify?contract=${contract}&shortId=${shortId}`);
          const messageData = messageToSign.data.message;

          const { data: signature } = await signMessage({ message: messageData });
          const res = await ky.post("/api/verify", {
            json: {
              address: accountData.address,
              signature,
              network,
              contractAddress: contract,
              blockchain,
              tokenId,
              CID: submarineCID,
              shortId: shortId,
              messageId: messageToSign.data.session.id,
            },
          });

          return res.json();
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const description = (
    <p className="mt-4 mb-4 text-md text-muted">
      Unlock this content by connecting your wallet to verify you have the required NFT.
    </p>
  );
  return (
    <Provider autoConnect connectors={connectors}>
      {data.connected ? (
        <BaseLockType
          description={description}
          fileInfo={fileInfo}
          lockName={"nft"}
          handleVerify={handleSign}
        />
      ) : (
        <>
          {data.connectors.map((connector) => {
            return (
              <div key={connector.name}>
                {connector.ready && (
                  <button
                    className="m-2 inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect(connector)}
                  >
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                  </button>
                )}
              </div>
            );
          })}
        </>
      )}
    </Provider>
  );
};
export default NFT;
