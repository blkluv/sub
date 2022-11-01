import { Typography, Unstable_Grid2 } from "@mui/material";
import FormikTextfield from "../../../Form/FormikTextfield";

export default function TwitterForm() {
  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em", marginTop: "2em" }}>
      <Typography variant="h5">Tweet Details</Typography>
      <FormikTextfield
        name="unlockInfo.tweetUrl"
        label="Tweet URL"
        type="url"
        required
        autoComplete="off"
      />
    </Unstable_Grid2>
  );
}
