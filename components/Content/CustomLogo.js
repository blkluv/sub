import Image from "next/image";
import React, { useEffect, useState } from "react";

const CustomLogo = ({ logo, gatewayUrl }) => {
  return (
    <div className="w-20">
      <img
        alt="Logo"
        src={logo.includes("https") ? logo : `${gatewayUrl}/ipfs/${logo}`}
        className="w-16"
      />
    </div>
  );
};

export default CustomLogo;
