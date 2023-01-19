import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAlert } from "../store/selectors/alertSelectors";
import { clearAlert } from "../store/slices/alertSlice";
import styled from "@emotion/styled";
import { Alert as MuiAlert, Box, Container, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2

export enum AlertType {
  Warning = "warning",
  Error = "error",
  Info = "info",
}
const ExclamationIconStyled = styled(ExclamationIcon)`
  color: ${({ theme }) => theme.palette.warning.main};
  height: ${({ theme }) => theme.spacing(3)};
  width: ${({ theme }) => theme.spacing(3)};
  aria-hidden="true";
`;
const CheckIconStyled = styled(CheckIcon)`
  color: ${({ theme }) => theme.palette.success.main};
  height: ${({ theme }) => theme.spacing(3)};
  width: ${({ theme }) => theme.spacing(3)};
`;

const Alert = () => {
  const { type, message, timeout } = useAppSelector(selectAlert);
  const dispatch = useAppDispatch();
  if (timeout) {
    setTimeout(() => {
      dispatch(clearAlert());
    }, timeout);
  }
  if (!message) {
    return null;
  }

  return (
    <Box
      sx={{
        borderLeftWidth: "4px",
        borderColor:
          type === AlertType.Warning || type === AlertType.Error ? "warning.main" : "success.main",
        backgroundColor:
          type === AlertType.Warning || type === AlertType.Error
            ? "rgba(255, 251, 235)"
            : "rgb(240 253 244)",
        top: 0,
        left: 0,
        right: 0,
        position: "fixed",
        zIndex: 9999,
        width: "100%",
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Grid2 container>
        {type === AlertType.Warning || type === AlertType.Error ? (
          <ExclamationIconStyled />
        ) : (
          <CheckIconStyled />
        )}
        <Container sx={{ marginLeft: (theme) => theme.spacing(2) }}>
          <Typography
            sx={{
              fontSize: (theme) => theme.typography.subtitle1.fontSize,
              lineHeight: (theme) => theme.typography.subtitle1.lineHeight,
              color:
                type === AlertType.Warning || type === AlertType.Error
                  ? "rgb(161 98 7)"
                  : "rgb(21 128 61)",
            }}
          >
            {message}
          </Typography>
        </Container>
      </Grid2>
    </Box>
  );
};

export default Alert;
