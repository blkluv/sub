import { Unstable_Grid2 } from "@mui/material";
import Image from "next/image";

import { keyframes } from "@emotion/react";

const Loading = () => {
  const wiggle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }`;
  return (
    <Unstable_Grid2
      container
      sx={{
        padding: "20px",
        animation: `${wiggle} 1s ease infinite;`,
      }}
      justifyContent={"center"}
    >
      <Image alt="Submarine Logo" height={135} width={200} src="/submarine.png" />
    </Unstable_Grid2>
  );
};

export default Loading;
