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
          borderRadius: "20px",
          padding: (theme) => theme.spacing(1),
        },
      }}
      maxWidth="md"
      onClose={() => setOpen(false)}
    >
      <DialogTitle sx={{ display: "flex", gap: ".5em" }}>
        <InformationCircleIconStyled style={{ color: (theme) => theme.palette.info.light }} />
        What is the update authority address?
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
