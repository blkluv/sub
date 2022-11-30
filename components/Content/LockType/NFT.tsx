import { Button, Divider, Typography } from "@mui/material";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { getKy } from "../../../helpers/ky";
import { useAppDispatch } from "../../../store/hooks";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import BaseLockType from "./LockTypeContainer";

const NFT = ({ fileInfo }) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage();

  const handleSign = async (): Promise<SubmarinedContent> => {
    return new Promise(async (resolve, reject) => {
      // ts safety check
      if (fileInfo.unlockInfo.type === "nft") {
        const { shortId, submarineCID, unlockInfo } = fileInfo;
        const { contract, blockchain, tokenId, network } = unlockInfo;
        if (!contract || !blockchain || !network) {
          reject("Missing unlock info");
          return;
        }
        const ky = getKy();
        const messageToSign: any = await ky
          .get(`/api/verify?contract=${contract}&shortId=${shortId}`)
          .json();
        const messageData: string = messageToSign.message;
        const signature = await signMessageAsync({ message: messageData }).catch(() => {
          reject("Signature failed");
          return;
        });
        try {
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
          resolve(content);
          return;
        } catch (err) {
          reject("Could not verify NFT ownership");
        }
      }
    });
  };
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
          {description}
          {connectors.map((connector) => {
            return (
              <div key={connector.name} style={{ marginTop: "8px" }}>
                {connector.ready && (
                  <Button
                    sx={{
                      width: "90%",
                      maxWidth: "300px",
                      backgroundColor: (theme) => theme.palette.primary.light,
                      color: "black",
                      "&:hover": { backgroundColor: (theme) => theme.palette.grey[300] },
                    }}
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                  </Button>
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