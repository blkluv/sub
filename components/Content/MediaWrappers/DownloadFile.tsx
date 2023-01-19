import { Button, Unstable_Grid2, Box } from "@mui/material";
import { useState } from "react";
import DownloadBttn from "./DownloadBttn";
import { Download } from "@mui/icons-material";

const DownloadFile = ({ url }: { url: string }) => {
  const [jwtExpired, setJwtExpired] = useState<boolean>(false);
  window.setInterval(() => setJwtExpired(true), 60000);

  try {
    return (
      <Unstable_Grid2
        container
        flexDirection={"column"}
        sx={{ justifyContent: "center", alignItems: "center", gap: "1em" }}
      >
        <Box sx={{ position: "relative", height: "70vh", width: "80vh" }}>
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
            width="100%"
            height="100%"
          >
            This is an embedded{" "}
            <a target="_blank" href="http://office.com" rel="noreferrer">
              Microsoft Office
            </a>{" "}
            document, powered by{" "}
            <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
              Office Online
            </a>
            .
          </iframe>
        </Box>

        <DownloadBttn url={url} />
      </Unstable_Grid2>
    );
  } catch (error) {
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
  }

  return (
    <Unstable_Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "50%" }}
    >
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
        width="100%"
        height="100%"
      >
        This is an embedded{" "}
        <a target="_blank" href="http://office.com" rel="noreferrer">
          Microsoft Office
        </a>{" "}
        document, powered by{" "}
        <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
          Office Online
        </a>
        .
      </iframe>
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
