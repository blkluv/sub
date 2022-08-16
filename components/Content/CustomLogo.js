import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getGatewayUrl } from "../../helpers/user.helpers";

const CustomLogo = ({ logo }) => {
  const [gatewayUrl, setGatewayUrl] = useState("");
  useEffect(() => {
    setGatewayUrl(getGatewayUrl())
  }, []);
  return (
    <div className="w-20">
      <img
        alt="Logo"
        src={
          logo.includes("https")
            ? logo
            : `${gatewayUrl}/ipfs/${logo}`
        }
        className="w-8"
      />
    </div>
  );
};

export default CustomLogo;
