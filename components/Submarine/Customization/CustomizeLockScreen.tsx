import UploadImagePublic from "../../Upload/UploadImagePublic";
import { ChromePicker } from "react-color";
import Image from "next/image";
import { selectGatewayUrl } from "../../../store/selectors/authSelectors";
import { useAppSelector } from "../../../store/hooks";
import { useFormikContext } from "formik";
import { Field } from "formik";
import { MetadataUnlockInfo } from "../SelectLockType/SubmarineFileForm";
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  IconButton,
  MenuItem,
  Popover,
  Radio,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import { RadioGroup, Select } from "formik-mui";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const CustomizeLockScreen = () => {
  const { values, setFieldValue } = useFormikContext<MetadataUnlockInfo>();
  const background = values.customizations?.backgroundCid;
  const logo = values.customizations?.logoCid;
  const gatewayUrl = useAppSelector(selectGatewayUrl);
  const [anchorBttn, setAnchorBttn] = useState<HTMLButtonElement | null>(null);
  const [anchorFont, setAnchorFont] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorBttn);

  const validFonts = [
    "Inter",
    "Lato",
    "Open Sans",
    "Roboto",
    "Roboto Condensed",
    "Source Sans Pro",
  ];

  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em", marginBottom: "2em" }}>
      <Typography variant="h6">Logo Image</Typography>
      <Unstable_Grid2 container gap={"2em"} sx={{ alignItems: "center" }}>
        {logo && logo.length > 0 ? (
          <Unstable_Grid2 container>
            <IconButton
              sx={{ height: "40px", width: "40px" }}
              onClick={() => setFieldValue("customizations.logoCid", "")}
            >
              <CloseIcon />
            </IconButton>
            <Image
              src={`${gatewayUrl}/ipfs/${logo}`}
              alt="preview for logo"
              height={56}
              width={56}
            />
          </Unstable_Grid2>
        ) : (
          <Box
            sx={{
              display: "flex",
              border: "1px solid #C8C8C8",
              height: (theme) => theme.spacing(7),
              width: (theme) => theme.spacing(7),
              borderRadius: "8px",
              backgroundColor: (theme) => theme.palette.grey[100],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image height={27} width={40} src="/submarine.png" alt="Submarine Me" />
          </Box>
        )}
        <UploadImagePublic
          label={"Select a logo image"}
          setIpfsHash={(hash) => setFieldValue("customizations.logoCid", hash)}
        />
      </Unstable_Grid2>
      <Typography variant="h6">Background Image</Typography>
      <Unstable_Grid2 container gap={"2em"} sx={{ alignItems: "center" }}>
        {background && background.length > 0 ? (
          <Unstable_Grid2 container>
            <IconButton
              sx={{ height: "40px", width: "40px" }}
              onClick={() => setFieldValue("customizations.backgroundCid", "")}
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ borderRadius: "8px", overflow: "hidden", width: 160, height: 160 }}>
              <Image
                src={`${gatewayUrl}/ipfs/${background}`}
                height={160}
                width={160}
                alt="preview for background"
              />
            </Box>
          </Unstable_Grid2>
        ) : (
          <Card
            sx={{
              backgroundImage: "linear-gradient(161.52deg, #FF6B00 7.31%, #0038FF 98.65%)",
              height: "60px",
              width: "60px",
              borderRadius: "8px",
            }}
          ></Card>
        )}
        <UploadImagePublic
          label={"Select a background image"}
          setIpfsHash={(hash) => setFieldValue("customizations.backgroundCid", hash)}
        />
      </Unstable_Grid2>
      <Typography variant="h6">Button Shape</Typography>
      <Field component={RadioGroup} name="customizations.buttonShape" defaultValue="rounded">
        <FormControlLabel value="rounded" control={<Radio />} label="Rounded" />
        <FormControlLabel value="square" control={<Radio />} label="Squared" />
      </Field>
      <Typography variant="h6">Button Color</Typography>
      <Unstable_Grid2 container>
        {values.customizations.buttonColor && (
          <IconButton
            sx={{ height: "40px", width: "40px" }}
            onClick={() => setFieldValue("customizations.buttonColor", undefined)}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Unstable_Grid2 container sx={{ gap: "2em" }}>
          <Card
            sx={{
              backgroundColor: values.customizations.buttonColor
                ? values.customizations.buttonColor.hex
                : (theme) => theme.palette.primary.light,
              height: (theme) => theme.spacing(6),
              width: (theme) => theme.spacing(6),
              borderRadius: "30px",
            }}
          ></Card>
          <Button
            onClick={(event) => setAnchorBttn(event.currentTarget)}
            variant="outlined"
            aria-describedby="bttnColorBttn"
          >
            Select a color
          </Button>
          <Popover
            id="bttnColorBttn"
            open={Boolean(anchorBttn)}
            anchorEl={anchorBttn}
            onClose={() => setAnchorBttn(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <ChromePicker
              color={values.customizations.buttonColor}
              onChangeComplete={(color) => setFieldValue("customizations.buttonColor", color)}
            />
          </Popover>
        </Unstable_Grid2>
      </Unstable_Grid2>
      <Typography variant="h6">Button Text Color</Typography>
      <Unstable_Grid2 container>
        {values.customizations.buttonTextColor && (
          <IconButton
            sx={{ height: "40px", width: "40px" }}
            onClick={() => setFieldValue("customizations.buttonTextColor", undefined)}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Unstable_Grid2 container sx={{ gap: "2em" }}>
          <Card
            sx={{
              backgroundColor: values.customizations.buttonTextColor
                ? values.customizations.buttonTextColor.hex
                : (theme) => theme.palette.primary.dark,
              height: (theme) => theme.spacing(6),
              width: (theme) => theme.spacing(6),
              borderRadius: "30px",
            }}
          ></Card>
          <Button
            onClick={(event) => setAnchorFont(event.currentTarget)}
            variant="outlined"
            aria-describedby="fontColorBttn"
          >
            Select a color
          </Button>
          <Popover
            id="fontColorBttn"
            open={Boolean(anchorFont)}
            anchorEl={anchorFont}
            onClose={() => setAnchorFont(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <ChromePicker
              color={values.customizations.buttonTextColor}
              onChangeComplete={(color) => setFieldValue("customizations.buttonTextColor", color)}
            />
          </Popover>
        </Unstable_Grid2>
      </Unstable_Grid2>
      <Field
        formControl={{ sx: { width: "100%" } }}
        component={Select}
        name="customizations.fontFamily"
        label="Font Family"
        variant="standard"
      >
        {validFonts.map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </Field>
    </Unstable_Grid2>
  );
};

export default CustomizeLockScreen;
