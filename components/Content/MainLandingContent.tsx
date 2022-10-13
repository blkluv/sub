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
    <div style={getCustomFont(fileInfo)}>
      <Box sx={{ position: "absolute", padding: (theme) => theme.spacing(2, 4) }}>
        {fileInfo.customizations && fileInfo.customizations.logoCid ? (
          <CustomLogo logo={fileInfo.customizations.logoCid} gatewayUrl={gatewayUrl} />
        ) : (
          <SubmarineLogoSvg />
        )}
      </Box>
      <Box
        style={forcedStyle(fileInfo, gatewayUrl)}
        sx={{
          width: isPreview ? "50%" : "100%",
          margin: "auto",
          backgroundImage: fileInfo.customizations?.backgroundCid
            ? `url(${gatewayUrl}/ipfs/${fileInfo.customizations?.backgroundCid})`
            : "none",
          background:
            !fileInfo.customizations?.backgroundCid &&
            "linear-gradient(180deg, #b6ece2 0%, #9c6bc3 100%)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {content}
      </Box>
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
