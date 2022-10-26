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
      <Box sx={{ display: "flex", justifyContent: "flex-start", padding: "1em", gap: "5em" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <UploadImagePublic
            label={"Background Image"}
            setIpfsHash={(hash) => setFieldValue("customizations.backgroundCid", hash)}
          />
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <UploadImagePublic
            label={"Logo"}
            setIpfsHash={(hash) => setFieldValue("customizations.logoCid", hash)}
          />
          {logo && logo.length > 0 ? (
            <Image
              src={`${gatewayUrl}/ipfs/${logo}`}
              alt="preview for logo"
              height={160}
              width={160}
            />
          ) : (
            <NoImageIcon />
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", padding: "1em", gap: "1em" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography>Button Color</Typography>
          <SketchPicker
            color={values.customizations.buttonColor}
            onChangeComplete={(color) => setFieldValue("customizations.buttonColor", color)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography>Button Text Color</Typography>
          <SketchPicker
            color={values.customizations.buttonTextColor}
            onChangeComplete={(color) => setFieldValue("customizations.buttonTextColor", color)}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", padding: "1em" }}>
        <FormControl>
          <FormLabel>Button shape</FormLabel>
          <Field
            component={RadioGroup}
            row
            name="customizations.buttonShape"
            defaultValue="rounded"
          >
            <FormControlLabel value="rounded" control={<Radio />} label="Rounded" />
            <FormControlLabel value="square" control={<Radio />} label="Square" />
          </Field>
        </FormControl>
      </Box>
      <Box sx={{ padding: "1em" }}>
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
      </Box>
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
