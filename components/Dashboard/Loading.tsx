import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <Image
      alt="Submarine Logo"
      height={135}
      width={200}
      src="/submarine.png"
      className="animate-wiggle z-100"
    />
  );
};

export default Loading;
