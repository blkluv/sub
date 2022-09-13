import Image from "next/image";
import React, { useEffect, useState } from "react";

const CustomLogo = ({ logo }) => {
  const [gatewayUrl, setGatewayUrl] = useState("");
  useEffect(() => {
    setGatewayUrl(localStorage.getItem("sm-gateway"));
  }, []);
  return (
    <div className="w-20">
      <Image
        alt="Logo"
        src={logo.includes("https") ? logo : `${gatewayUrl}/ipfs/${logo}`}
        className="w-8"
      />
    </div>
  );
};

export default CustomLogo;
