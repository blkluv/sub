import { Button } from "@mui/material";
import { useState } from "react";
import { Download } from "@mui/icons-material";

const DownloadFile = ({ url }: { url: string }) => {
  const [jwtExpired, setJwtExpired] = useState<boolean>(false);
  window.setInterval(() => setJwtExpired(true), 60000);

  return (
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
  );
};
export default DownloadFile;
