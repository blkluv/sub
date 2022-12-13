import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Unstable_Grid2,
} from "@mui/material";
import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { CheckboxWithLabel } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import { FormLabel, Typography } from "@mui/material";
import * as Yup from "yup";

export default function CancelDialog() {
  const [open, setOpen] = useState(false);
  const userReasons = [
    {
      label: "Missing features I need",
      value: "missingFeatures",
    },
    {
      label: "Switching to an alternative production",
      value: "altProduct",
    },
    {
      label: "Experiencing technical issues",
      value: "techIssues",
    },
    {
      label: "Too expensive",
      value: "tooExpensive",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancellation = (values) => {
    console.log("User Reasons: ", values);
    setOpen(false);
  };

  return (
    <Unstable_Grid2>
      <Button variant="outlined" onClick={handleClickOpen}>
        Cancel Subscription
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: "20px", padding: "1rem" },
        }}
      >
        <DialogTitle>
          <Typography variant="h5">Cancel Subscription</Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            onSubmit={(values) => handleCancellation(values)}
            initialValues={{ userReasons: [] }}
            validationSchema={Yup.object({
              userReasons: Yup.array().min(1, "Please select at least one reason."),
            })}
          >
            {({ values, errors, touched }) => {
              return (
                <Form>
                  <DialogContentText>
                    <FormControl component="fieldset" style={{ display: "flex" }}>
                      <FormLabel component="legend">
                        We are sad to see you go! Please select a reason for leaving.
                      </FormLabel>
                      <FormGroup>
                        {userReasons.map((opt) => (
                          <Field
                            type="checkbox"
                            component={CheckboxWithLabel}
                            name="userReasons"
                            key={opt.value}
                            value={opt.value}
                            Label={{ label: opt.label }}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                    {touched.userReasons && errors.userReasons && (
                      <Typography variant="subtitle2" color="red">
                        {errors.userReasons}
                      </Typography>
                    )}
                  </DialogContentText>
                  <DialogActions sx={{ marginTop: "1rem" }}>
                    <Button variant="outlined" onClick={handleClose}>
                      Nevermind
                    </Button>
                    <Button type="submit">Cancel Subscription</Button>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </Unstable_Grid2>
  );
}
