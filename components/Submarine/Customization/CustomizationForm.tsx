import { useState } from "react";
import { FormControlLabel, Box, Switch, Typography, Unstable_Grid2 } from "@mui/material";
import CustomizeLockScreen from "./CustomizeLockScreen";
import Image from "next/image";
import { selectGatewayUrl } from "../../../store/selectors/authSelectors";
import { useAppSelector } from "../../../store/hooks";
import { useFormikContext } from "formik";
import { MetadataUnlockInfo } from "../SelectLockType/SubmarineFileForm";
import UploadImagePublic from "../../Upload/UploadImagePublic";
import React from "react";

const CustomizationForm = () => {
  const [customize, setCustomize] = useState(false);
  const { values, setFieldValue } = useFormikContext<MetadataUnlockInfo>();
  const thumbnail = values.thumbnail;
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em", marginTop: "2em" }}>
      <Typography variant="h5">Customization</Typography>
      <Typography variant="h6">Select a thumbnail image (optional)</Typography>
      <Unstable_Grid2 container gap={"2em"} sx={{ alignItems: "center" }}>
        {thumbnail && thumbnail.length && thumbnail.length > 0 ? (
          <Box
            sx={{
              borderRadius: "30px",
              overflow: "hidden",
              width: (theme) => theme.spacing(7),
              height: (theme) => theme.spacing(7),
            }}
          >
            <Image
              src={`${gatewayUrl}/ipfs/${thumbnail}`}
              height={56}
              width={56}
              alt="preview for thumbnail"
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              border: "1px solid #C8C8C8",
              height: (theme) => theme.spacing(7),
              width: (theme) => theme.spacing(7),
              borderRadius: "30px",
              backgroundColor: (theme) => theme.palette.grey[100],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image height={27} width={40} src="/submarine.png" alt="Submarine Me" />
          </Box>
        )}
        <UploadImagePublic
          label={"Select a thumbnail image"}
          setIpfsHash={(hash) => setFieldValue("thumbnail", hash)}
        />
      </Unstable_Grid2>
      <FormControlLabel
        control={
          <Switch
            defaultChecked
            checked={customize}
            onChange={(e) => setCustomize(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Customize Unlock Screen"
      />
      {customize && <CustomizeLockScreen />}
    </Unstable_Grid2>
  );
};

export default CustomizationForm;
