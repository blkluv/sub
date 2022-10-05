import React from "react";
import SubmarineLogoSvg from "../SubmarineLogoSvg";
import Loading from "../Dashboard/Loading";
import CustomLogo from "./CustomLogo";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import Missing from "./Missing";
import LockedContentContainer from "./LockedContentContainer";

import UnlockedContentContainer from "./UnlockedContentContainer";
import { useAppSelector } from "../../store/hooks";
import { selectHasUnlockedContent } from "../../store/selectors/submarinedContentSelectors";

export interface MainLandingContentProps {
  missing: boolean;
  fileInfo: MetadataUnlockInfo;
  gatewayUrl: string;
  isPreview?: boolean;
}

const MainLandingContent = ({
  fileInfo,
  gatewayUrl,
  missing,
  isPreview = false,
}: MainLandingContentProps) => {
  const hasUnlockedContent = useAppSelector(selectHasUnlockedContent);
  if (!fileInfo) {
    return <Loading />;
  }

  if (missing) {
    return <Missing />;
  }

  return (
    <div style={getCustomFont(fileInfo)}>
      <div className="absolute p-4 flex flex-row">
        {fileInfo.customizations && fileInfo.customizations.logoCid ? (
          <CustomLogo logo={fileInfo.customizations.logoCid} gatewayUrl={gatewayUrl} />
        ) : (
          <SubmarineLogoSvg />
        )}
      </div>
      <div
        style={forcedStyle(fileInfo, gatewayUrl)}
        className={`${
          !fileInfo?.customizations?.backgroundCid ? "public-content-bg" : ""
        } bg-cover bg-no-repeat ${
          isPreview ? "w-full" : "w-screen"
        } min-h-screen flex flex-col justify-center align-center`}
      >
        <div className="p-10 md:w-1/2 w-auto mx-2 h-auto max-h-3/4 text-center flex flex-col align-center md:m-auto bg-white shadow-lg rounded-lg mt-36 mb-36 md:mt-36 md:mb-36">
          {hasUnlockedContent ? (
            <UnlockedContentContainer name={fileInfo.name} />
          ) : (
            <LockedContentContainer fileInfo={fileInfo} gatewayUrl={gatewayUrl} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLandingContent;

const getCustomFont = (fileInfo) => {
  const fontFamily = fileInfo?.customizations?.fontFamily;
  return fontFamily ? { fontFamily: `'${fontFamily}', sans-serif` } : {};
};
const forcedStyle = (fileInfo, gatewayUrl) => {
  if (fileInfo && fileInfo.customizations && fileInfo.customizations.backgroundCid) {
    return {
      backgroundImage: `url(${gatewayUrl}/ipfs/${fileInfo.customizations.backgroundCid})`,
    };
  }
  return {};
};
