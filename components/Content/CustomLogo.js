import Image from "next/image";
import React from "react";

const CustomLogo = ({ logo }) => {
  return (
    <div className="w-20">
      <img
        alt="Logo"
        src={
          logo.includes("https")
            ? logo
            : `https://submarineme.mypinata.cloud/ipfs/${logo}`
        }
        className="w-8"
      />
    </div>
  );
};

export default CustomLogo;
