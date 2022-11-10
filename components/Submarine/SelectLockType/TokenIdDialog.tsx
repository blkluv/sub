import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import InformationCircleIconStyled from "../../Form/InformationCircleIconStyled";

export default function TokenIdDialog({ open, setOpen }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDialog-paper": {
          width: "70vw",
          borderRadius: "30px",
          padding: (theme) => theme.spacing(1),
        },
      }}
      maxWidth="md"
    >
      <DialogTitle sx={{ display: "flex", gap: ".5em" }}>
        <InformationCircleIconStyled style={{ color: (theme) => theme.palette.green[100] }} />
        What happens if I provide a token ID?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you provide a token ID, we will not only check to see an NFT from the collection is
          owned by the wallet, we will check if the specific token ID provided is owned by wallet.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
