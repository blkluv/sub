import { Download } from "@mui/icons-material";
import { Box, Button, IconButton, Unstable_Grid2 } from "@mui/material";
import Image from "next/image";

export interface ImageWrapperProps {
  url: string;
  originalName: string;
}

const ImageWrapper = ({ url, originalName }: ImageWrapperProps) => {
  return (
    <Unstable_Grid2 container justifyContent={"center"} alignItems={"center"} direction={"column"}>
      <Box
        sx={{
          position: "relative",
          height: "70vh",
          width: "70vw",
        }}
      >
        <Image
          src={url}
          alt={originalName}
          layout="fill"
          objectFit="contain"
          style={{ zIndex: 29 }}
        />
      </Box>

      <Button
        href={url}
        sx={{
          backgroundColor: "white",
          borderColor: "black",
          color: "black",
          width: "10em",
          marginTop: "1rem",
        }}
      >
        <Download />
        Download
      </Button>
    </Unstable_Grid2>
  );
};

export default ImageWrapper;
