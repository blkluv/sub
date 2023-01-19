import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";

interface CustomButtonProps {
  fileInfo: MetadataUnlockInfo;
  loading?: boolean;
  lockName: string;
  onClick: () => void;
}
const CustomButton = ({ fileInfo, loading = false, lockName, onClick }: CustomButtonProps) => {
  const [styles, setStyles] = useState({});
  useEffect(() => {
    const style = {
      width: "90%",
      maxWidth: "300px",
      backgroundColor: "#FAFAFA",
      color: "#181818",
      borderRadius: 1000,
    };
    if (fileInfo?.customizations?.buttonColor?.hex) {
      style.backgroundColor = fileInfo.customizations.buttonColor.hex;
    }

    if (fileInfo?.customizations?.buttonTextColor?.hex) {
      style.color = fileInfo.customizations.buttonTextColor.hex;
    }

    if (fileInfo?.customizations?.buttonShape === "square") {
      style.borderRadius = 5;
    }

    setStyles(style);
  }, [fileInfo]);

  return (
    <Button onClick={onClick} style={styles}>
      {loading ? `Verifying ${lockName}...` : `Verify ${lockName}`}
    </Button>
  );
};

export default CustomButton;
