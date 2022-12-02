import { Button, Unstable_Grid2 } from "@mui/material";

const DownloadFile = ({ url }: { url: string }) => {
  return (
    <Unstable_Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "50%" }}
    >
      <Button
        sx={{
          a: { color: "#fff", textDecoration: "none" },
        }}
      >
        <a href={url}>Content unlocked! Click here to download</a>
      </Button>
    </Unstable_Grid2>
  );
};
export default DownloadFile;
