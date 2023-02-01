import { Button } from "@mui/material";
import { useState } from "react";
import { Download } from "@mui/icons-material";

const DownloadBttn = ({ url }: { url: string }) => {
  const [jwtExpired, setJwtExpired] = useState<boolean>(false);
  window.setInterval(() => setJwtExpired(true), 60000);
  return (
    <Button
      disabled={jwtExpired}
      href={url}
      sx={{
        width: "10em",
        backgroundColor: "white",
        borderColor: "black",
        color: "black",
      }}
    >
      <Download />
      Download
    </Button>
  );
};

export default DownloadBttn;
