import SubmarineLogoSvg from "../SubmarineLogoSvg";
import Loading from "../Dashboard/Loading";
import CustomLogo from "./CustomLogo";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import Missing from "./Missing";
import LockedContentContainer from "./LockedContentContainer";

import UnlockedContentContainer from "./UnlockedContentContainer";
import { useAppSelector } from "../../store/hooks";
import { selectHasUnlockedContent } from "../../store/selectors/submarinedContentSelectors";
import { Box, Unstable_Grid2, useMediaQuery } from "@mui/material";

export interface MainLandingContentProps {
  missing: boolean;
  fileInfo?: MetadataUnlockInfo;
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
    content = <UnlockedContentContainer fileInfo={fileInfo} />;
  } else {
    content = (
      <LockedContentContainer fileInfo={fileInfo} gatewayUrl={gatewayUrl} isPreview={isPreview} />
    );
  }
  return (
    <>
      <Box
        sx={{ position: "absolute", padding: (theme) => theme.spacing(2, 4), width: "fit-content" }}
        style={getCustomFont(fileInfo)}
      >
        {fileInfo?.customizations && fileInfo?.customizations.logoCid ? (
          <CustomLogo logo={fileInfo?.customizations.logoCid} gatewayUrl={gatewayUrl} />
        ) : (
          <SubmarineLogoSvg />
        )}
      </Box>
      <Unstable_Grid2
        container
        justifyContent="center"
        alignItems="center"
        style={forcedStyle(fileInfo, gatewayUrl)}
        sx={{
          backgroundImage: fileInfo?.customizations?.backgroundCid
            ? `url(${gatewayUrl}/ipfs/${fileInfo?.customizations?.backgroundCid})`
            : "none",
          background:
            !fileInfo?.customizations?.backgroundCid &&
            "linear-gradient(161.52deg, #FF6B00 7.31%, #0038FF 98.65%)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          justifyContent: "center",
          borderRadius: isPreview ? "45px" : 0,
        }}
      >
        {content}
      </Unstable_Grid2>
    </>
  );
};

export default MainLandingContent;

const getCustomFont = (fileInfo) => {
  const fontFamily = fileInfo?.customizations?.fontFamily;
  return fontFamily ? { fontFamily: `'${fontFamily}', sans-serif` } : {};
};
const forcedStyle = (fileInfo, gatewayUrl) => {
  if (fileInfo && fileInfo?.customizations && fileInfo?.customizations.backgroundCid) {
    return {
      backgroundImage: `url(${gatewayUrl}/ipfs/${fileInfo?.customizations.backgroundCid})`,
    };
  }
  return {};
};
