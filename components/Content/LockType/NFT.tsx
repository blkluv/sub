import { Button, Divider, Typography } from "@mui/material";
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
    <Typography
      variant="body1"
      sx={{
        padding: (theme) => theme.spacing(1),
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      Unlock this content by connecting your wallet to verify you have the required NFT.
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
          <Divider sx={{ width: "100%", margin: (theme) => theme.spacing(2, 0, 2, 0) }} />
          {description}
          {connectors.map((connector) => {
            return (
              <div key={connector.name} style={{ marginTop: "8px" }}>
                {connector.ready && (
                  <Button
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
