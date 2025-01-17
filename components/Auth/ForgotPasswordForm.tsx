import { Box, Button, Container, Typography, Unstable_Grid2 } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Formik, Form, FormikHelpers } from "formik";
import FormikTextfield from "../Form/FormikTextfield";
import * as Yup from "yup";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { setAlert } from "../../store/slices/alertSlice";
import { AlertType } from "../Alert";

const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const [authError, setAuthError] = useState("");

  const validationsRegex: Record<string, RegExp> = {
    // any encoding letters allowed
    name: /^[a-zA-Z\s]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#%^])[A-Za-z\d$@$!%*?&#%^]{8,}/,
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required").matches(validationsRegex.email),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .max(50, "Too Long!")
      .matches(
        validationsRegex.password,
        "Password must contain at least 8 characters, including UPPER/lowercase, numbers and special characters"
      ),
    code: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  });

  const router = useRouter();

  const [codeSent, setCodeSent] = useState(false);
  const initialValues = {
    email: "",
    code: "",
    password: "",
  };
  const onSubmit = async (values, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
    console.log("submit");
    setSubmitting(true);
    try {
      if (codeSent) {
        await Auth.forgotPasswordSubmit(values.email, values.code, values.password);
        dispatch(
          setAlert({
            message: "Password changed successfully",
            type: AlertType.Info,
          })
        );
        setSubmitting(false);
        router.push("/");
      } else {
        await Auth.forgotPassword(values.email);
        setCodeSent(true);
        dispatch(
          setAlert({
            message: "Confirmation code sent. Please check your email address",
            type: AlertType.Info,
          })
        );
      }
    } catch (err) {
      if (err.code === "UserNotFoundException") {
        setAuthError("User not found");
      } else if (err.code === "CodeMismatchException") {
        setAuthError("Invalid code");
      } else {
        setAuthError("Something went wrong");
      }
      setSubmitting(false);
    }
  };

  return (
    <Container sx={{ marginTop: "2rem" }} maxWidth="md" fixed>
      <Unstable_Grid2
        container
        justifyContent={"center"}
        direction="column"
        alignContent={"center"}
      >
        <Typography variant="h3" sx={{ marginBottom: "2rem" }}>
          Recover your password
        </Typography>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Unstable_Grid2
                container
                justifyContent={"center"}
                direction="column"
                alignContent={"center"}
              >
                <FormikTextfield
                  fullWidth
                  name="email"
                  label="Email address"
                  type="email"
                  required
                  autoComplete="off"
                />
                {codeSent && (
                  <>
                    <FormikTextfield
                      fullWidth
                      name="password"
                      label="New password"
                      type="password"
                      required
                      autoComplete="off"
                    />
                    <FormikTextfield
                      fullWidth
                      name="code"
                      label="Confirmation code"
                      type="text"
                      required
                      autoComplete="off"
                    />
                  </>
                )}
                <Box sx={{ marginTop: "1rem" }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      zIndex: 100,
                      height: "auto",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <span>{isSubmitting ? "Sending code..." : "Forgot password"}</span>
                  </Button>
                  <Unstable_Grid2
                    container
                    justifyContent={"center"}
                    direction="column"
                    alignContent={"center"}
                  >
                    <Typography variant={"body1"} color="error" sx={{ marginTop: "1rem" }}>
                      {authError}
                    </Typography>
                  </Unstable_Grid2>
                </Box>
              </Unstable_Grid2>
            </Form>
          )}
        </Formik>
      </Unstable_Grid2>
    </Container>
  );
};
export default ForgotPasswordForm;
