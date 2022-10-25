import { useState } from "react";
import * as FullStory from "@fullstory/browser";
import { Button, Container, TextField, Typography, Unstable_Grid2 } from "@mui/material";
import Link from "next/link";
import { Box } from "@mui/system";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectAuthError,
  selectAuthStatus,
  selectIsMFARequest,
} from "../../store/selectors/authSelectors";
import { confirmMFA, doLogin, LOGIN_STATUSES } from "../../store/slices/authSlice";
import { Auth } from "aws-amplify";

export default function AuthForm() {
  const loginStatus = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);
  const [mfa, setMFA] = useState("");

  const isMFARequest = useAppSelector(selectIsMFARequest);
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [password, setPassword] = useState("");

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
        dispatch(doLogin({ email, password }));
      } catch (error) {
        setInvalidCode(true);
      }
      return;
    }
    if (isMFARequest) {
      if (mfa) {
        dispatch(confirmMFA({ mfa }));
        return;
      }
    }

    dispatch(doLogin({ email, password }));
    //sample FullStory SDK calls
    FullStory.setVars("page", {
      userEmail: email,
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
  return (
    <Container sx={{ marginTop: "2rem" }} maxWidth="md">
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
            direction="column"
            alignContent={"center"}
          >
            <Typography variant="body1" sx={{ margin: (theme) => theme.spacing(1, 0, 1, 0) }}>
              Or{" "}
              <Link passHref href="/auth/signup">
                <Typography variant="body1" color="primary.main" sx={{ display: "inline" }}>
                  sign up here.
                </Typography>
              </Link>
            </Typography>
          </Unstable_Grid2>
        </Unstable_Grid2>
        <form onSubmit={handleSubmit}>
          {isMFARequest ? (
            <TextField
              id="mfs"
              name="mfa"
              type="text"
              required
              value={mfa}
              onChange={(e) => setMFA(e.target.value)}
              placeholder="MFA code"
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
              />
              {loginStatus === LOGIN_STATUSES.needsConfirmation && (
                <>
                  <Typography variant="body1" sx={{ margin: (theme) => theme.spacing(1, 0, 1, 0) }}>
                    Please check your email for a confirmation code.{" "}
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
              disabled={loginStatus === LOGIN_STATUSES.pending}
              sx={{
                height: "auto",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <span>{loginStatus === LOGIN_STATUSES.pending ? "Signing in..." : "Sign in"}</span>
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
        </form>
      </Unstable_Grid2>
    </Container>
  );
}
