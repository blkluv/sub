import Image from "next/image";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectGatewayUrl } from "../../store/selectors/authSelectors";

const CustomLogo = ({ logo }) => {
  const gatewayUrl = useAppSelector(selectGatewayUrl);
  return (
    <div className="w-20">
      <Image
        alt="Logo"
        src={logo.includes("https") ? logo : `${gatewayUrl}/ipfs/${logo}`}
        className="w-8"
        width={40}
        height={40}
      />
    </div>
  );
};

export default CustomLogo;
