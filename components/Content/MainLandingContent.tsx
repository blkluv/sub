import SubmarineLogoSvg from "../SubmarineLogoSvg";
import Loading from "../Dashboard/Loading";
import CustomLogo from "./CustomLogo";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import Missing from "./Missing";
import LockedContentContainer from "./LockedContentContainer";

import UnlockedContentContainer from "./UnlockedContentContainer";
import { useAppSelector } from "../../store/hooks";
import { selectHasUnlockedContent } from "../../store/selectors/submarinedContentSelectors";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export interface MainLandingContentProps {
  missing: boolean;
  fileInfo: MetadataUnlockInfo;
  gatewayUrl: string;
}

const MainLandingContent = ({ fileInfo, gatewayUrl, missing }: MainLandingContentProps) => {
  const [isPreview, setIsPreview] = useState<boolean>(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (
      path.includes("/submarine/nft") ||
      path.includes("/submarine/location") ||
      path.includes("/submarine/retweet")
    ) {
      setIsPreview(true);
    }
  }, []);

  console.log(isPreview);
  const hasUnlockedContent = useAppSelector(selectHasUnlockedContent);
  let content;
  if (missing) {
    content = <Missing />;
  } else if (!fileInfo) {
    content = <Loading />;
  } else if (hasUnlockedContent) {
    content = <UnlockedContentContainer name={fileInfo.name} />;
  } else {
    content = <LockedContentContainer fileInfo={fileInfo} gatewayUrl={gatewayUrl} />;
  }
  return (
    <>
      <Box
        sx={{ position: "absolute", padding: (theme) => theme.spacing(2, 4), width: "fit-content" }}
        style={getCustomFont(fileInfo)}
      >
        {fileInfo.customizations && fileInfo.customizations.logoCid ? (
          <CustomLogo logo={fileInfo.customizations.logoCid} gatewayUrl={gatewayUrl} />
        ) : (
          <SubmarineLogoSvg />
        )}
      </Box>
      <Box
        style={forcedStyle(fileInfo, gatewayUrl)}
        sx={{
          backgroundImage: fileInfo.customizations?.backgroundCid
            ? `url(${gatewayUrl}/ipfs/${fileInfo.customizations?.backgroundCid})`
            : "none",
          background:
            !fileInfo.customizations?.backgroundCid &&
            "linear-gradient(161.52deg, #FF6B00 7.31%, #0038FF 98.65%)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: isPreview ? "90vh" : "100vh",
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          borderRadius: isPreview && "45px",
        }}
      >
        {content}
      </Box>
    </>
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
