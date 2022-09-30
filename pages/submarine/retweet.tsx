import React from "react";
import SubmarineFileForm, {
  MetadataUnlockInfo,
} from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import Twitter from "../../components/Submarine/SelectLockType/Twitter";
import { UnlockInfoRetweet } from "../../types/UnlockInfo";

const Retweet = () => {
  const canSubmit = (values: MetadataUnlockInfo): boolean => {
    const unlockInfo = values.unlockInfo as UnlockInfoRetweet;
    const tweetUrl = unlockInfo.tweetUrl;
    return /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(tweetUrl);
  };

  const unlockInfo: UnlockInfoRetweet = {
    type: "retweet",
    tweetUrl: "",
  };

  return (
    <SubmarineFileForm canSubmit={canSubmit} unlockInfo={unlockInfo}>
      <Twitter />
    </SubmarineFileForm>
  );
};

export default Retweet;
