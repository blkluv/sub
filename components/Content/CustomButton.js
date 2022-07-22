import React, { useEffect, useState } from 'react'

const CustomButton = ({ fileInfo, buttonText, loadingText, loading, onClick: click }) => {
  const [styles, setStyles] = useState({
    padding: 10
  });
  const [classes, setClasses] = useState('cursor-pointer');

  useEffect(() => {
    const style = {
      padding: 10,
      marginTop: 5      
    }
    if(fileInfo?.customizations.buttonColor && fileInfo?.customizations?.buttonColor?.hex) {
      style.backgroundColor = fileInfo.customizations.buttonColor.hex;
    } else {
      style.backgroundColor = "#8000DB"
    }

    if(fileInfo?.customizations?.buttonTextColor && fileInfo?.customizations?.buttonTextColor.hex) {
      style.color = fileInfo.customizations.buttonTextColor.hex
    } else {
      style.color = '#fff';
    }

    if(fileInfo?.customizations?.buttonShape === "rounded") {
      style.borderRadius = 1000;
    }
    setStyles(style);
  }, [fileInfo])

  return (
    <button onClick={click} style={styles} className={`${fileInfo?.customizations?.buttonShape === "rounded" ? "rounded-full" : ""}`}>{loading ? loadingText : buttonText}</button>
  )
}

export default CustomButton