import { useEffect, useState } from "react";
import * as FullStory from "@fullstory/browser";
import { Box, Button, Container, TextField, Typography, Unstable_Grid2 } from "@mui/material";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectAuthError,
  selectAuthStatus,
  selectIsMFARequest,
} from "../../store/selectors/authSelectors";
import { confirmMFA, doLogin, LOGIN_STATUSES } from "../../store/slices/authSlice";
import { Auth } from "aws-amplify";
import { ANALYTICS } from "../../constants/rudderstack_events";

export default function AuthForm() {
  const loginStatus = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);
  const [mfa, setMFA] = useState("");

  const isMFARequest = useAppSelector(selectIsMFARequest);
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [password, setPassword] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [invalidCode, setInvalidCode] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loginStatus === LOGIN_STATUSES.needsConfirmation) {
      if (confirmationCode.length !== 6) {
        return;
      }
      try {
        await Auth.confirmSignUp(email, confirmationCode);
      } catch (error) {
        setInvalidCode(true);
        return;
      }
    }
    if (isMFARequest) {
      if (mfa) {
        dispatch(confirmMFA({ mfa }));
        return;
      }
    }

    //sample FullStory SDK calls
    FullStory.setVars("page", {
      userEmail: email,
    });

    doLoginAndTrackEvent({ email, password });
  };

  const doLoginAndTrackEvent = ({ email, password }) => {
    dispatch(doLogin({ email, password }))
      .unwrap()
      .then((user) => {
        const daUser = user.user || {};
        const firstName = daUser["custom:firstName"] || "firstnamenotfound";
        const lastName = daUser["custom:lastName"] || "lastnamenotfound";
        const userId = daUser.sub || "useridnotfound";
        window.rudderanalytics.identify(userId, { email, firstName, lastName });
        window.rudderanalytics.track(ANALYTICS.AUTH.LOGIN, {
          first_login: false,
        });
      });
  };

  const [hasRequestedNewCode, setHasRequestedNewCode] = useState(false);
  const handleResendConfirmationCode = async (event) => {
    event.preventDefault();
    if (hasRequestedNewCode) {
      return;
    }
    setHasRequestedNewCode(true);
    Auth.resendSignUp(email);
  };

  useEffect(() => {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      const { email, password } = JSON.parse(credentials);
      setDisableSubmit(true);
      setEmail(email);
      setPassword(password);
      dispatch(doLogin({ email, password }))
        .unwrap()
        .then(() => {
          setDisableSubmit(false);
        });
      FullStory.setVars("page", {
        userEmail: email,
      });
      localStorage.removeItem("credentials");
    }
  }, []);

  return (
    <Container sx={{ marginTop: "2rem" }} maxWidth="sm">
      <Unstable_Grid2
        container
        justifyContent={"center"}
        direction="column"
        alignContent={"center"}
      >
        <Unstable_Grid2>
          <Typography variant="h3">Sign in with your Pinata account</Typography>
          <Unstable_Grid2
            container
            justifyContent={"center"}
            direction="row"
            alignContent={"center"}
            sx={{ margin: (theme) => theme.spacing(1, 0, 1, 0) }}
          >
            <Typography variant="body1">Or&nbsp;</Typography>
            <Link passHref href="/auth/signup">
              <Typography variant="body1" color="primary.main" sx={{ cursor: "pointer" }}>
                sign up here.
              </Typography>
            </Link>
          </Unstable_Grid2>
        </Unstable_Grid2>
        <form onSubmit={handleSubmit}>
          {isMFARequest ? (
            <TextField
              id="mfs"
              name="mfa"
              type="text"
              required
              fullWidth
              value={mfa}
              onChange={(e) => setMFA(e.target.value)}
              placeholder="MFA code"
              sx={{ paddingTop: "0.25rem" }}
            />
          ) : (
            <>
              <TextField
                fullWidth
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                sx={{ paddingTop: "0.25rem" }}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                sx={{ paddingTop: "0.25rem" }}
              />
              {loginStatus === LOGIN_STATUSES.needsConfirmation && (
                <>
                  <Typography
                    variant="body1"
                    sx={{ margin: (theme) => theme.spacing(1, 0, 1, 0), display: "inline-block" }}
                  >
                    Please check your email for a confirmation code.
                  </Typography>{" "}
                  <Typography
                    variant="body1"
                    color="primary.main"
                    sx={{
                      display: "inline",
                      cursor: hasRequestedNewCode ? "not-allowed" : "pointer",
                    }}
                    onClick={handleResendConfirmationCode}
                  >
                    {hasRequestedNewCode ? "Code resent!" : "Click to resend."}
                  </Typography>
                  <TextField
                    fullWidth
                    id="confirmation-code"
                    name="confirmation-code"
                    type="text"
                    required
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    placeholder="Confirmation Code"
                  />
                  <Unstable_Grid2
                    container
                    justifyContent={"center"}
                    direction="column"
                    alignContent={"center"}
                  >
                    <Typography variant={"body1"} color="error" sx={{ marginTop: "1rem" }}>
                      {invalidCode && "Invalid confirmation code"}
                    </Typography>
                  </Unstable_Grid2>
                </>
              )}
            </>
          )}
          <Box sx={{ marginTop: "1rem" }}>
            <Button
              type="submit"
              disabled={loginStatus === LOGIN_STATUSES.pending || disableSubmit}
              sx={{
                height: "auto",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <span>
                {loginStatus === LOGIN_STATUSES.pending || disableSubmit
                  ? "Signing in..."
                  : "Sign in"}
              </span>
            </Button>
            <Unstable_Grid2
              container
              justifyContent={"center"}
              direction="column"
              alignContent={"center"}
            >
              <Link passHref href="/auth/forgotpassword">
                <Typography
                  variant={"body1"}
                  color="primary.main"
                  sx={{ cursor: "pointer", marginTop: "1rem", textAlign: "center" }}
                >
                  {"Forgot password?"}
                </Typography>
              </Link>
              <Typography
                variant={"body1"}
                color="error"
                component="pre"
                sx={{ marginTop: "1rem", textAlign: "center" }}
              >
                {authError}
              </Typography>
            </Unstable_Grid2>
          </Box>
        </form>
      </Unstable_Grid2>
    </Container>
  );
}
