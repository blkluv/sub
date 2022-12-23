import { Typography, Unstable_Grid2 } from "@mui/material";
import FormikTextfield from "../../../Form/FormikTextfield";

export default function TwitterForm() {
  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em", marginTop: "2em" }}>
      <Typography variant="h5">Twitch Broadcaster ID</Typography>
      <FormikTextfield
        name="unlockInfo.broadcasterID"
        label="Broadcaster ID"
        required
        autoComplete="off"
      />
    </Unstable_Grid2>
  );
}
