import { useState } from "react";
import UploadMedia from "../../Upload/UploadMedia";
import { Typography, Unstable_Grid2 } from "@mui/material";
import FormikTextfield from "../../Form/FormikTextfield";

const FileDetailForm = () => {
  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em" }}>
      <Typography variant="h5">Content Details</Typography>
      <FormikTextfield type="text" name="name" label="Name" required maxLength={100} />
      <FormikTextfield
        type="text"
        name="description"
        label="Description"
        required
        maxLength={400}
      />
      <UploadMedia />
    </Unstable_Grid2>
  );
};

export default FileDetailForm;
