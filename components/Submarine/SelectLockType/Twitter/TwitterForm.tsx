import { Unstable_Grid2 } from "@mui/material";
import FormikTextfield from "../../../Form/FormikTextfield";

export default function TwitterForm() {
  return (
    <Unstable_Grid2 container spacing={0}>
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
