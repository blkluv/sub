import { Button, Unstable_Grid2 } from "@mui/material";
import { Download } from "@mui/icons-material";

const DownloadFile = ({ url }: { url: string }) => {
  return (
    <Unstable_Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "50%" }}
    >
      <Button
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
