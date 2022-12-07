import MapIcon from "@mui/icons-material/Map";
import { Divider, Typography, Unstable_Grid2 } from "@mui/material";
import { getKy } from "../../../helpers/ky";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { UnlockInfoFlow, UnlockInfoLocation, UnlockInfoNFT } from "../../../types/UnlockInfo";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
import BaseLockType from "./LockTypeContainer";
import { getMessagetoSign } from "../../../helpers/messageToSign";
import fcl from "../../../flow/fcl";
import { useEffect, useState } from "react";
const FlowUnlock = ({ fileInfo }) => {
  interface LocationProps {
    fileInfo: MetadataUnlockInfo;
  }

  const [flowUser, setFlowUser] = useState();
  useEffect(() => fcl.currentUser.subscribe(setFlowUser), []);
  console.log({ flowUser });
  const verify = async (): Promise<SubmarinedContent> => {
    return new Promise(async (resolve, reject) => {
      const unlockInfo = fileInfo.unlockInfo as UnlockInfoFlow;
      if (!unlockInfo.contract) {
        reject("Missing unlock info");
        return;
      }
      const ky = getKy();
      const { contract } = unlockInfo;
      const payload: {
        contract: string;
        id: string;
      } = await ky.get(`/api/flow/verify?contract=${contract}`).json();
      await fcl.authenticate();
      const message = getMessagetoSign(payload?.contract, payload?.id);
      const encoded = Buffer.from(message).toString("hex");
      const currentUser = fcl.currentUser();
      const signature = await currentUser.signUserMessage(encoded);
      const content = await ky.post("/api/flow/verify", { json: signature }).json();
      // Request authorization from the user's wallet.
      // This will open a pop-up window that allows the
      // user to sign in to their wallet and authorize
      // your website to access their account.
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
    <BaseLockType
      description={description}
      fileInfo={fileInfo}
      lockName={"nft"}
      handleVerify={verify}
    />
  );
};

export default FlowUnlock;
