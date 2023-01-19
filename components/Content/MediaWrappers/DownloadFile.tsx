import { Button, Unstable_Grid2 } from "@mui/material";
import { Download } from "@mui/icons-material";
import { useState } from "react";

const DownloadFile = ({ url }: { url: string }) => {
  const [jwtExpired, setJwtExpired] = useState<boolean>(false);
  window.setInterval(() => setJwtExpired(true), 60000);

  return (
    <Unstable_Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "50%" }}
    >
      <Button
        disabled={jwtExpired}
        href={url}
        variant="outlined"
        sx={{
          a: { color: "#fff", textDecoration: "none" },
          backgroundColor: "white",
          borderColor: "black",
          color: "black",
          marginTop: "1rem",
        }}
      >
        <Download />
        Content unlocked! Click here to download
      </Button>
    </Unstable_Grid2>
  );
};
export default DownloadFile;
