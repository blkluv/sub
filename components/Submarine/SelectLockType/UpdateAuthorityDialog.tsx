import Image from "next/image";
import authority from "./update_authority.png";
import InformationCircleIconStyled from "../../Form/InformationCircleIconStyled";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Unstable_Grid2,
} from "@mui/material";

export default function UpdateAuthorityDialog({
  updateAuthorityDialogOpen: open,
  setUpdateAuthorityDialogOpen: setOpen,
}) {
  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          width: "70vw",
          borderRadius: "30px",
          padding: (theme) => theme.spacing(1),
        },
      }}
      maxWidth="md"
      onClose={() => setOpen(false)}
    >
      <DialogTitle sx={{ display: "flex", gap: ".5em" }}>
        <InformationCircleIconStyled style={{ color: (theme) => theme.palette.info.light }} />
        <Typography variant="h6">What is the update authority address?</Typography>
      </DialogTitle>
      <DialogContent>
        <Image src={authority} alt={"Update Authority"} layout="responsive" />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
