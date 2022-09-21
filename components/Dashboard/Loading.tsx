import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div>
      <Image
        alt="Submarine Logo"
        height={135}
        width={200}
        src="/submarine.png"
        className="animate-wiggle z-100"
      />
    </div>
  );
};

export default Loading;
