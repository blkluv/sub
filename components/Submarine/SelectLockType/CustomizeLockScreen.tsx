import React, { useState, useEffect } from "react";
import UploadImagePublic from "../../Upload/UploadImagePublic";
import { SketchPicker } from "react-color";
import Image from "next/image";
import { selectGatewayUrl } from "../../../store/selectors/authSelectors";
import { useAppSelector } from "../../../store/hooks";
import { useFormikContext } from "formik";
import { Field } from "formik";
import { MetadataUnlockInfo } from "./SubmarineFileForm";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import { RadioGroup, Select } from "formik-mui";

const CustomizeLockScreen = () => {
  const { values, setFieldValue } = useFormikContext<MetadataUnlockInfo>();
  const background = values.customizations?.backgroundCid;
  const logo = values.customizations?.logoCid;
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  const validFonts = [
    "Inter",
    "Lato",
    "Open Sans",
    "Roboto",
    "Roboto Condensed",
    "Source Sans Pro",
  ];

  return (
    <div>
      <Unstable_Grid2 container justifyContent={"center"}>
        <Typography>Background Image</Typography>
        <Box>
          {background && background.length > 0 ? (
            <Image
              src={`${gatewayUrl}/ipfs/${background}`}
              height={160}
              width={160}
              alt="preview for background"
            />
          ) : (
            <NoImageIcon />
          )}
        </Box>
        <UploadImagePublic
          label={"Upload"}
          setIpfsHash={(hash) => setFieldValue("customizations.backgroundCid", hash)}
        />
      </Unstable_Grid2>
      <Unstable_Grid2 container justifyContent={"center"}>
        <Typography>Logo Image</Typography>
        <Box>
          {logo && logo.length > 0 ? (
            <Image
              src={`${gatewayUrl}/ipfs/${logo}`}
              alt="preview for logo"
              height={40}
              width={40}
            />
          ) : (
            <NoImageIcon />
          )}
        </Box>
        <UploadImagePublic
          label={"Upload"}
          setIpfsHash={(hash) => setFieldValue("customizations.logoCid", hash)}
        />
      </Unstable_Grid2>
      <Unstable_Grid2 container justifyContent={"space-evenly"}>
        <Typography>Button Color</Typography>
        <SketchPicker
          color={values.customizations.buttonColor}
          onChangeComplete={(color) => setFieldValue("customizations.buttonColor", color)}
        />
      </Unstable_Grid2>

      <Unstable_Grid2 container justifyContent={"space-evenly"}>
        <Typography>Button Text Color</Typography>
        <SketchPicker
          color={values.customizations.buttonTextColor}
          onChangeComplete={(color) => setFieldValue("customizations.buttonTextColor", color)}
        />
      </Unstable_Grid2>
      <Unstable_Grid2 container justifyContent={"space-evenly"}>
        <FormControl>
          <FormLabel>Button shape</FormLabel>
          <Field component={RadioGroup} row name="customizations.buttonShape">
            <FormControlLabel value="square" control={<Radio />} label="Square" />
            <FormControlLabel value="rounded" control={<Radio />} label="Rounded" />
          </Field>
        </FormControl>
      </Unstable_Grid2>
      <Unstable_Grid2 container justifyContent={"space-between"}>
        <Field
          formControl={{ sx: { width: "100%" } }}
          component={Select}
          name="customizations.fontFamily"
          label="Font Family"
        >
          {validFonts.map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Field>
      </Unstable_Grid2>
    </div>
  );
};

export default CustomizeLockScreen;

const NoImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "10rem",
      height: "10rem",
    }}
    fill="none"
    viewBox="0 0 40 40"
    stroke="gray"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
