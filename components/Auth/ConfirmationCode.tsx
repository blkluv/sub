import { Typography, Unstable_Grid2, TextField, Button } from "@mui/material";
import { useState } from "react";

import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

const ConfirmationCode = ({ credentials }) => {
  const [hasRequestedNewCode, setHasRequestedNewCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const router = useRouter();
  const handleResendConfirmationCode = async (event) => {
    event.preventDefault();
    if (hasRequestedNewCode) {
      return;
    }
    setHasRequestedNewCode(true);
    Auth.resendSignUp(credentials.email);
  };
  const handleSubmit = async () => {
    if (confirmationCode.length !== 6) {
      return;
    }
    try {
      setSubmitting(true);
      await Auth.confirmSignUp(credentials.email, confirmationCode);
      localStorage.setItem("credentials", JSON.stringify(credentials));
      router.push("/");
    } catch (error) {
      setInvalidCode(true);
      setSubmitting(false);
      return;
    }
  };
  return (
    <>
      <Typography variant="body1" sx={{ margin: (theme) => theme.spacing(1, 0, 1, 0) }}>
        Please check your email for a confirmation code.{" "}
        <Typography
          variant="body1"
          color="primary.main"
          sx={{
            display: "block",
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
      <Button
        onClick={handleSubmit}
        disabled={confirmationCode.length !== 6 || submitting}
        sx={{
          height: "auto",
          justifyContent: "center",
          marginTop: "1rem",
          width: "100%",
        }}
      >
        Submit
      </Button>
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
  );
};

export default ConfirmationCode;
