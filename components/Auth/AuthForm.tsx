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

export default function AuthForm() {
  const loginStatus = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);
  const [mfa, setMFA] = useState("");

  const isMFARequest = useAppSelector(selectIsMFARequest);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const handleValidSubmit = async (event) => {
    event.preventDefault();
    if (isMFARequest) {
      let res;
      if (mfa) {
        res = dispatch(confirmMFA({ mfa }));
      } else {
        // TODO handle this case?
      }
    }

    dispatch(doLogin({ email, password }));
    //sample FullStory SDK calls
    FullStory.setVars("page", {
      userEmail: email,
    });
    FullStory.event("Logged in", {
      userEmail: email,
    });
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
        <form onSubmit={handleValidSubmit}>
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
        </form>
      </Unstable_Grid2>
    </Container>
  );
}
