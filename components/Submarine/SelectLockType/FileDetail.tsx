import { useState } from "react";
import UploadMedia from "../../Upload/UploadMedia";
import {
  Box,
  FormControlLabel,
  FormGroup,
  SvgIcon,
  Switch,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import CustomizeLockScreen from "./CustomizeLockScreen";
import Image from "next/image";
import { selectGatewayUrl } from "../../../store/selectors/authSelectors";
import { useAppSelector } from "../../../store/hooks";
import { useFormikContext } from "formik";
import { MetadataUnlockInfo } from "./SubmarineFileForm";
import FormikTextfield from "../../Form/FormikTextfield";
import UploadImagePublic from "../../Upload/UploadImagePublic";

const FileDetail = () => {
  const [customize, setCustomize] = useState(false);
  const { values, setFieldValue } = useFormikContext<MetadataUnlockInfo>();
  const thumbnail = values.thumbnail;
  const gatewayUrl = useAppSelector(selectGatewayUrl);
  return (
    <Unstable_Grid2 container direction={"column"}>
      <Unstable_Grid2>
        <FormikTextfield type="text" name="name" label="Name" required maxLength={100} />
        <FormikTextfield
          type="text"
          name="description"
          label="Description"
          required
          maxLength={400}
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
      <Unstable_Grid2 container justifyContent={"flex-start"} alignItems={"center"}>
        <Typography>Thumbnail (Optional)</Typography>
        <Unstable_Grid2 container>
          <Box
            sx={{
              height: (theme) => theme.spacing(6),
              width: (theme) => theme.spacing(6),
              borderRadius: 9999,
              overflow: "hidden",
              backgroundColor: (theme) => theme.palette.grey[100],
            }}
          >
            {thumbnail && thumbnail.length && thumbnail.length > 0 ? (
              <Image
                src={`${gatewayUrl}/ipfs/${thumbnail}`}
                height={48}
                width={48}
                alt="preview for thumbnail"
              />
            ) : (
              <SvgIcon
                sx={{
                  height: (theme) => theme.spacing(6),
                  width: (theme) => theme.spacing(6),
                  borderRadius: 9999,
                  backgroundColor: (theme) => theme.palette.grey[300],
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </SvgIcon>
            )}
          </Box>
          <UploadImagePublic
            label={"Upload"}
            setIpfsHash={(hash) => setFieldValue("thumbnail", hash)}
          />
        </Unstable_Grid2>
      </Unstable_Grid2>
      <UploadMedia />
    </Unstable_Grid2>
  );
};

export default FileDetail;
