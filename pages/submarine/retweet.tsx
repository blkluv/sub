import React from "react";
import SubmarineFileForm, {
  MetadataUnlockInfo,
} from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import Twitter from "../../components/Submarine/SelectLockType/Twitter";
import { UnlockInfoRetweet } from "../../types/UnlockInfo";
import * as Yup from "yup";

const Retweet = () => {
  const unlockInfo: UnlockInfoRetweet = {
    type: "retweet",
    tweetUrl: "",
  };

  const unlockInfoSchema = Yup.object().shape({
    tweetUrl: Yup.string()
      .required("Required")
      .matches(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/, "Tweet url is not valid.")
      .max(100, "Url length must be less than 100 characters."),
  });

  return (
    <SubmarineFileForm unlockInfo={unlockInfo} unlockInfoSchema={unlockInfoSchema}>
      <Twitter />
    </SubmarineFileForm>
  );
};

export default Retweet;
