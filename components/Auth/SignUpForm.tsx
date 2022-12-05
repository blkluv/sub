import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import * as FullStory from "@fullstory/browser";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Formik, Form, FormikHelpers, Field } from "formik";
import FormikTextfield from "../Form/FormikTextfield";
import * as Yup from "yup";
import { FormControlLabel, FormLabel, Radio } from "@mui/material";
import { RadioGroup } from "formik-mui";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { setAlert } from "../../store/slices/alertSlice";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const [authError, setAuthError] = useState("");

  const validationsRegex: Record<string, RegExp> = {
    // any encoding letters allowed
    name: /^[a-zA-Z\s]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#%^])[A-Za-z\d$@$!%*?&#%^]{8,}/,
  };

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .matches(validationsRegex.name, "Invalid name"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .matches(validationsRegex.name, "Invalid name"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .max(50, "Too Long!")
      .required("Required")
      .matches(
        validationsRegex.password,
        "Password must contain at least 8 characters, including UPPER/lowercase, numbers and special characters"
      ),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isBuilder: null,
    howToUse: [],
  };
  const onSubmit = async (values, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
    setSubmitting(true);
    const params = {
      username: values.email,
      password: values.password,
      attributes: {
        email: values.email,
        "custom:firstName": values.firstName,
        "custom:lastName": values.lastName,
        "custom:userType": values.isBuilder,
      },
    };
    try {
      await Auth.signUp(params);
      dispatch(
        setAlert({
          message: "Account created. Please confirm your email address",
          type: "success",
        })
      );
      FullStory.event("Sign up", {
        userEmail: values.email,
        howToUse: values.howToUse,
      });
      router.push("/");
    } catch (err) {
      setAuthError(err.message);
      setSubmitting(false);
    }
  };

  const checkboxOptions = {
    videos: "Videos",
    images: "Images",
    audioFiles: "Audio Files",
    website: "Website / Web Apps",
    models: "3D Models",
    other: "Other",
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
          Register your Pinata account
        </Typography>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Unstable_Grid2
                container
                justifyContent={"center"}
                direction="column"
                alignContent={"center"}
              >
                <FormikTextfield
                  fullWidth
                  name="firstName"
                  label="First Name"
                  required
                  autoComplete="off"
                />
                <FormikTextfield
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  required
                  autoComplete="off"
                />
                <FormikTextfield
                  fullWidth
                  name="email"
                  label="Email address"
                  type="email"
                  required
                  autoComplete="off"
                />
                <FormikTextfield
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  required
                  autoComplete="off"
                />
                <FormikTextfield
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  autoComplete="off"
                />
                <FormControl sx={{ margin: "8px" }}>
                  <FormLabel>Are you a builder or a creator?</FormLabel>
                  <Field component={RadioGroup} row name="isBuilder">
                    <FormControlLabel value="builder" control={<Radio />} label="Builder" />
                    <FormControlLabel value="creator" control={<Radio />} label="Creator" />
                  </Field>
                </FormControl>

                <FormControl sx={{ margin: "8px" }}>
                  <FormLabel>How will you use Submarine.me?</FormLabel>
                  {Object.entries(checkboxOptions).map(([key, label]) => (
                    <Field
                      sx={{ spacing: "0.25 rem", marginBottom: 0 }}
                      type="checkbox"
                      name="howToUse"
                      value={key}
                      key={key}
                      as={FormControlLabel}
                      control={<Checkbox />}
                      checked={values.howToUse.includes(key)}
                      label={label}
                    />
                  ))}
                </FormControl>
                <Box sx={{ marginTop: "1rem" }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      height: "auto",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <span>{isSubmitting ? "Signing up..." : "Sign up"}</span>
                  </Button>
                  <Typography
                    variant={"body1"}
                    color="error"
                    sx={{
                      width: "50%",
                      margin: "0 auto",
                      marginTop: "1rem",
                    }}
                  >
                    {authError}
                  </Typography>
                </Box>
              </Unstable_Grid2>
            </Form>
          )}
        </Formik>
      </Unstable_Grid2>
    </Container>
  );
};
export default SignUpForm;
