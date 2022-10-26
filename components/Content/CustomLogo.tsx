import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const CustomLogo = ({ logo, gatewayUrl }) => {
  return (
    <Box sx={{ width: "5rem" }}>
      <Image
        alt="Logo"
        src={logo.includes("https") ? logo : `${gatewayUrl}/ipfs/${logo}`}
        style={{ width: "2rem" }}
        width={40}
        height={40}
      />
    </Box>
  );
};

export default CustomLogo;
