import { Typography, Unstable_Grid2 } from "@mui/material";
import FormikTextfield from "../../../Form/FormikTextfield";

export default function TwitchForm() {
  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em", marginTop: "2em" }}>
      <Typography variant="h5">Twitch Details</Typography>
      <FormikTextfield
        name="unlockInfo.loginName"
        label="Twitch Username"
        required
        autoComplete="off"
      />
    </Unstable_Grid2>
  );
}
