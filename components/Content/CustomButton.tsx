import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

const CustomButton = ({ fileInfo, loading = false, lockName, onClick }) => {
  const [styles, setStyles] = useState({
    padding: 10,
  });
  useEffect(() => {
    const style = {
      padding: 15,
      marginTop: 5,
      backgroundColor: null,
      color: null,
      borderRadius: null,
      width: "343px",
    };
    if (fileInfo?.customizations.buttonColor && fileInfo?.customizations?.buttonColor?.hex) {
      style.backgroundColor = fileInfo.customizations.buttonColor.hex;
    } else {
      style.backgroundColor = "#FAFAFA";
    }

    if (
      fileInfo?.customizations?.buttonTextColor &&
      fileInfo?.customizations?.buttonTextColor.hex
    ) {
      style.color = fileInfo.customizations.buttonTextColor.hex;
    } else {
      style.color = "#181818";
    }

    if (fileInfo?.customizations?.buttonShape === "square") {
      style.borderRadius = 5;
    } else {
      style.borderRadius = 1000;
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
