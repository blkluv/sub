import React from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { getKy } from "../../../helpers/ky";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import BaseLockType from "./LockTypeContainer";

const NFT = ({ fileInfo }) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage();

  const handleSign = async () => {
    try {
      // ts safety check
      if (fileInfo.unlockInfo.type === "nft") {
        const { shortId, submarineCID, unlockInfo } = fileInfo;
        const { contract, blockchain, tokenId, network } = unlockInfo;
        const ky = getKy();
        const messageToSign: any = await ky
          .get(`/api/verify?contract=${contract}&shortId=${shortId}`)
          .json();
        const messageData: string = messageToSign.message;
        const signature = await signMessageAsync({ message: messageData });
        const content: SubmarinedContent = await ky
          .post("/api/verify", {
            json: {
              address: address,
              signature,
              network,
              contractAddress: contract,
              blockchain,
              tokenId,
              CID: submarineCID,
              shortId: shortId,
              messageId: messageToSign.session.id,
            },
          })
          .json();
        return content;
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
    <>
      {isConnected ? (
        <BaseLockType
          description={description}
          fileInfo={fileInfo}
          lockName={"nft"}
          handleVerify={handleSign}
        />
      ) : (
        <>
          {connectors.map((connector) => {
            return (
              <div key={connector.name}>
                {connector.ready && (
                  <button
                    className="m-2 inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
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
    </>
  );
};
export default NFT;
