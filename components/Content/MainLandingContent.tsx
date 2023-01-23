import SubmarineLogoSvg from "../SubmarineLogoSvg";
import CustomLogo from "./CustomLogo";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import LockedContentContainer from "./LockedContentContainer";

import UnlockedContentContainer from "./UnlockedContentContainer";
import { useAppSelector } from "../../store/hooks";
import { selectHasUnlockedContent } from "../../store/selectors/submarinedContentSelectors";
import { Box, Unstable_Grid2 } from "@mui/material";

export type MainLandingContentProps = {
  fileInfo: null | MetadataUnlockInfo;
  gatewayUrl: string;
  isPreview?: boolean;
};

const MainLandingContent = ({
  fileInfo,
  gatewayUrl,
  isPreview = false,
}: MainLandingContentProps) => {
  const hasUnlockedContent = useAppSelector(selectHasUnlockedContent);

  let content;
  if (hasUnlockedContent) {
    content = <UnlockedContentContainer fileInfo={fileInfo} />;
  } else if (fileInfo) {
    content = (
      <LockedContentContainer fileInfo={fileInfo} gatewayUrl={gatewayUrl} isPreview={isPreview} />
    );
  }
  return (
    <>
      <Box
        sx={{ position: "absolute", padding: (theme) => theme.spacing(2, 4), width: "fit-content" }}
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
        sx={{
          backgroundImage: fileInfo?.customizations?.backgroundCid
            ? `url(${gatewayUrl}/ipfs/${fileInfo?.customizations?.backgroundCid})`
            : "none",
          background:
            (!fileInfo?.customizations?.backgroundCid &&
              "linear-gradient(161.52deg, #FF6B00 7.31%, #0038FF 98.65%)") ||
            "",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          justifyContent: "center",
          borderRadius: isPreview ? "45px" : 0,
          fontFamily: fileInfo?.customizations?.fontFamily || "Roboto",
        }}
      >
        {content}
      </Unstable_Grid2>
    </>
  );
};

export default MainLandingContent;
