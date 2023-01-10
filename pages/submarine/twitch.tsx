import React from "react";
import SubmarineFileForm, {
  MetadataUnlockInfo,
} from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import Twitch from "../../components/Submarine/SelectLockType/Twitch";
import { UnlockInfoTwitch } from "../../types/UnlockInfo";

import * as Yup from "yup";

const TwitchSub = () => {
  const unlockInfo: UnlockInfoTwitch = {
    type: "twitch",
    loginName: "",
  };

  const unlockInfoSchema = Yup.object().shape({
    loginName: Yup.string()
      .required("Required")
      .min(4, "Not a valid login name")
      .max(25, "Not a valid login name"),
  });

  return (
    <SubmarineFileForm unlockInfo={unlockInfo} unlockInfoSchema={unlockInfoSchema}>
      <Twitch />
    </SubmarineFileForm>
  );
};

export default TwitchSub;
