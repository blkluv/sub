import React from "react";
import SubmarineFileForm, {
  MetadataUnlockInfo,
} from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import Twitter from "../../components/Submarine/SelectLockType/Twitter";
import { UnlockInfoRetweet } from "../../types/UnlockInfo";
import * as Yup from "yup";

const Retweet = () => {
  // const canSubmit = (values: MetadataUnlockInfo): boolean => {
  //   const unlockInfo = values.unlockInfo as UnlockInfoRetweet;
  //   const tweetUrl = unlockInfo.tweetUrl;
  //   return /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(tweetUrl);
  // };

  const unlockInfo: UnlockInfoRetweet = {
    type: "retweet",
    tweetUrl: "",
  };

  const unlockInfoSchema = Yup.object().shape({
    tweetUrl: Yup.string()
      .required("Please enter a tweet url")
      .matches(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/, "Tweet url is not valid."),
  });

  return (
    <SubmarineFileForm unlockInfo={unlockInfo} unlockInfoSchema={unlockInfoSchema}>
      <Twitter />
    </SubmarineFileForm>
  );
};

export default Retweet;
