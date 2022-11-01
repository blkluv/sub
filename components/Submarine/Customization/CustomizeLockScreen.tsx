import UploadImagePublic from "../../Upload/UploadImagePublic";
import { ChromePicker } from "react-color";
import Image from "next/image";
import { selectGatewayUrl } from "../../../store/selectors/authSelectors";
import { useAppSelector } from "../../../store/hooks";
import { useFormikContext } from "formik";
import { Field } from "formik";
import { MetadataUnlockInfo } from "../SelectLockType/SubmarineFileForm";
import {
  Button,
  Card,
  FormControlLabel,
  MenuItem,
  Popover,
  Radio,
  SvgIcon,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import { RadioGroup, Select } from "formik-mui";
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
      <Unstable_Grid2 container gap={"2em"}>
        {logo && logo.length > 0 ? (
          <Image src={`${gatewayUrl}/ipfs/${logo}`} alt="preview for logo" height={48} width={48} />
        ) : (
          <SvgIcon
            sx={{
              height: (theme) => theme.spacing(6),
              width: (theme) => theme.spacing(6),
              borderRadius: "30px",
              backgroundColor: (theme) => theme.palette.grey[300],
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </SvgIcon>
        )}
        <UploadImagePublic
          label={"Select a logo image"}
          setIpfsHash={(hash) => setFieldValue("customizations.logoCid", hash)}
        />
      </Unstable_Grid2>
      <Typography variant="h6">Background Image</Typography>
      <Unstable_Grid2 container gap={"2em"}>
        {background && background.length > 0 ? (
          <Image
            src={`${gatewayUrl}/ipfs/${background}`}
            height={160}
            width={160}
            alt="preview for background"
          />
        ) : (
          <Card
            sx={{
              backgroundImage: "linear-gradient(161.52deg, #FF6B00 7.31%, #0038FF 98.65%)",
              height: (theme) => theme.spacing(6),
              width: (theme) => theme.spacing(6),
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
        <FormControlLabel value="square" control={<Radio />} label="Square" />
      </Field>
      <Typography variant="h6">Button Color</Typography>
      <Unstable_Grid2 container sx={{ gap: "2em" }}>
        <Card
          sx={{
            backgroundColor: values.customizations.buttonColor
              ? values.customizations.buttonColor.hex
              : "white",
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
      <Typography variant="h6">Button Text Color</Typography>
      <Unstable_Grid2 container sx={{ gap: "2em" }}>
        <Card
          sx={{
            backgroundColor: values.customizations.buttonTextColor
              ? values.customizations.buttonTextColor.hex
              : "white",
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
        `
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
