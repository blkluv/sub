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
import * as FullStory from "@fullstory/browser";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors/authSelectors";
import type { BillingState, Plan } from "../../store/legacy/billing/types";

interface ChangePlanRes {
  plan: Plan;
  nextPlan: Plan;
}
interface PlanCancelProps {
  billing: BillingState;
  changePlan: (newPlan: Plan) => Promise<ChangePlanRes>;
  scheduleUsageMetrics: (...props: any) => any;
}

export default function CancelDialog({
  billing,
  changePlan,
  scheduleUsageMetrics,
}: PlanCancelProps) {
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const userReasons = [
    {
      label: "Missing desired features",
      value: "missingFeatures",
    },
    {
      label: "Switching to an alternative product",
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

  const handleCancellation = async (values) => {
    setLoading(true);
    try {
      const changePlanRes: ChangePlanRes = await changePlan(billing.billing_plans[0]);
      // if (!changePlanRes.nextPlan) {
      //   scheduleUsageMetrics();
      // }
    } catch (error) {
    } finally {
      setLoading(false);
    }

    console.log("User Reasons: ", values);
    FullStory.event("User Cancellation", {
      user_reasons: values,
      user_email: user.email,
      user_firstName: user.firstname,
      user_lastName: user.lastname,
      user_gateway: user.gatewayUrl,
    });
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
