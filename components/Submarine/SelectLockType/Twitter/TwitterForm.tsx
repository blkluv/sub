import { Unstable_Grid2 } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-mui";

export default function TwitterForm() {
  return (
    <Unstable_Grid2 container spacing={0}>
      <Field
        sx={{ m: 1 }}
        component={TextField}
        name="unlockInfo.tweetUrl"
        label="Tweet URL"
        required
        autoComplete="off"
      />
    </Unstable_Grid2>
  );
}
