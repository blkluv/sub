import { ReactElement } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Alert,
  Typography,
} from "@mui/material";
import { MetricLimitData } from "../../store/legacy/metrics/types";
import { metricLimitInfo } from "../../constants/planTypes";

type PossibleButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

interface ConfirmationModalProps {
  title: string | ReactElement | null;
  content?: string | ReactElement | null;
  modalOpen: boolean;
  toggleModal: (defaultStatus: boolean) => void;
  isDisabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  action: () => void;
  modalContent?: any;
  confirmButtonText?: string;
  confirmButtonColor?: PossibleButtonColor | any;
  cancelButtonText?: string;
  cancelButtonColor?: PossibleButtonColor | any;
  userMetricLimit?: MetricLimitData;
}

const ConfirmationModal = ({
  title,
  content,
  modalOpen,
  toggleModal,
  loading,
  loadingText,
  isDisabled,
  action,
  modalContent,
  confirmButtonText = "Confirm",
  confirmButtonColor = "primary",
  cancelButtonText = "Cancel",
  cancelButtonColor = "inherit",
  userMetricLimit,
}: ConfirmationModalProps) => {
  return (
    <Dialog fullWidth open={modalOpen} onClose={() => toggleModal(false)}>
      {userMetricLimit?.title !== metricLimitInfo.PLAN_OK.title && (
        <Alert severity={userMetricLimit?.type}>{userMetricLimit?.text}</Alert>
      )}

      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">{title}</Typography>
        <IconButton
          sx={{ padding: 0 }}
          aria-label="close"
          onClick={() => !loading && toggleModal(false)}
        >
          <span aria-hidden="true">&times;</span>
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading && loadingText && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography>{loadingText}</Typography>
          </Box>
        )}
        {loading ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div>
                <CircularProgress />
              </div>
            </Box>
          </>
        ) : (
          <Grid container>
            {content && (
              <Grid item xs={12}>
                <Typography> {content}</Typography>
              </Grid>
            )}
            {modalContent && (
              <Grid item xs={12}>
                <Typography>{modalContent}</Typography>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
        <Button onClick={() => action()} color={confirmButtonColor} disabled={isDisabled}>
          {confirmButtonText}
        </Button>
        <Button
          fullWidth
          onClick={() => toggleModal(false)}
          color={cancelButtonColor}
          disabled={loading}
        >
          {cancelButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state: any) => ({
  userMetricLimit: state?.metrics?.metricsLimitData,
});

export default connect(mapStateToProps, null)(ConfirmationModal);
