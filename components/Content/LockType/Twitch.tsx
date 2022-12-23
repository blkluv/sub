import { Button, Unstable_Grid2 } from "@mui/material";
import { Container } from "@mui/system";

const Twitch = ({ fileInfo, isPreview }) => {
  return (
    <Unstable_Grid2 container direction={"column"} justifyContent={"center"}>
      <Container>
        <Button
          variant="contained"
          onClick={() => console.log("Twitch auth")}
          sx={{
            width: "90%",
            maxWidth: "300px",
            borderRadius: 1000,
            ...(fileInfo?.customizations?.buttonShape === "square" && {
              borderRadius: 2,
            }),
            backgroundColor: (theme) => theme.palette.primary.light,
            ...(fileInfo?.customizations.buttonColor &&
              fileInfo?.customizations?.buttonColor?.hex && {
                backgroundColor: fileInfo.customizations.buttonColor.hex,
              }),
            color: "#000000",
            ...(fileInfo?.customizations?.buttonTextColor &&
              fileInfo?.customizations?.buttonTextColor.hex && {
                color: fileInfo.customizations.buttonTextColor.hex,
              }),
          }}
        >
          Connect Twitch
        </Button>
      </Container>
    </Unstable_Grid2>
  );
};
export default Twitch;
