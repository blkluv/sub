import SubmarineLogoSvg from "../SubmarineLogoSvg";
import Loading from "../Dashboard/Loading";
import CustomLogo from "./CustomLogo";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import Missing from "./Missing";
import LockedContentContainer from "./LockedContentContainer";

import UnlockedContentContainer from "./UnlockedContentContainer";
import { useAppSelector } from "../../store/hooks";
import { selectHasUnlockedContent } from "../../store/selectors/submarinedContentSelectors";
import { Unstable_Grid2, Box } from "@mui/material";

export interface MainLandingContentProps {
  missing: boolean;
  fileInfo: MetadataUnlockInfo;
  gatewayUrl: string;
}

const MainLandingContent = ({ fileInfo, gatewayUrl, missing }: MainLandingContentProps) => {
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
    <Unstable_Grid2 container>
      <Box
        sx={{
          backgroundImage: fileInfo.customizations?.backgroundCid
            ? `url(${gatewayUrl}/ipfs/${fileInfo.customizations?.backgroundCid})`
            : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          background:
            !fileInfo.customizations?.backgroundCid &&
            "linear-gradient(161.52deg, #FF6B00 7.31%, #0038FF 98.65%)",
          borderRadius: "30px",
          alignContent: "center",
          padding: (theme) => theme.spacing(2, 2, 0, 2),
        }}
        style={forcedStyle(fileInfo, gatewayUrl)}
      >
        <Unstable_Grid2 style={getCustomFont(fileInfo)}>
          {fileInfo.customizations && fileInfo.customizations.logoCid ? (
            <CustomLogo logo={fileInfo.customizations.logoCid} gatewayUrl={gatewayUrl} />
          ) : (
            <SubmarineLogoSvg />
          )}
        </Unstable_Grid2>
        <Unstable_Grid2 container direction={"column"}>
          {content}
        </Unstable_Grid2>
      </Box>
    </Unstable_Grid2>
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
