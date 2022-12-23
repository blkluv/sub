import React from "react";
import SubmarineFileForm, {
  MetadataUnlockInfo,
} from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import Twitch from "../../components/Submarine/SelectLockType/Twitch";
import { UnlockInfoTwitch } from "../../types/UnlockInfo";
import { UnlockInfo } from "../../types/UnlockInfo";

import * as Yup from "yup";

const TwitchSub = () => {
  const unlockInfo: UnlockInfoTwitch = {
    type: "twitch",
    broadcasterID: "",
  };

  const unlockInfoSchema = Yup.object().shape({
    broadcasterID: Yup.string().required("Required"),
  });

  return (
    <SubmarineFileForm unlockInfo={unlockInfo} unlockInfoSchema={unlockInfoSchema}>
      <Twitch />
    </SubmarineFileForm>
  );
};

export default TwitchSub;
