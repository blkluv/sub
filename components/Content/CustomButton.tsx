import React, { useEffect, useState } from "react";

const CustomButton = ({ fileInfo, loading = false, lockName, onClick }) => {
  const [styles, setStyles] = useState({
    padding: 10,
  });
  useEffect(() => {
    const style = {
      padding: 10,
      marginTop: 5,
      backgroundColor: null,
      color: null,
      borderRadius: null,
    };
    if (fileInfo?.customizations.buttonColor && fileInfo?.customizations?.buttonColor?.hex) {
      style.backgroundColor = fileInfo.customizations.buttonColor.hex;
    } else {
      style.backgroundColor = "#8000DB";
    }

    if (
      fileInfo?.customizations?.buttonTextColor &&
      fileInfo?.customizations?.buttonTextColor.hex
    ) {
      style.color = fileInfo.customizations.buttonTextColor.hex;
    } else {
      style.color = "#fff";
    }

    if (fileInfo?.customizations?.buttonShape === "rounded") {
      style.borderRadius = 1000;
    }
    setStyles(style);
  }, [fileInfo]);

  return (
    <button onClick={onClick} style={styles}>
      {loading ? `Verifying ${lockName}...` : `Verify ${lockName}`}
    </button>
  );
};

export default CustomButton;
