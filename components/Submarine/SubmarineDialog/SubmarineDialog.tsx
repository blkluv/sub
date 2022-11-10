import {
  Dialog,
  IconButton,
  Typography,
  Unstable_Grid2,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UnlockTypeCardFactory from "./UnlockTypeCardFactory";

const SubmarineModal = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ "& .MuiDialog-paper": { width: "60vw", borderRadius: "30px" } }}
        maxWidth="lg"
      >
        <Unstable_Grid2
          container
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Unstable_Grid2
            container
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: (theme) => theme.spacing(3),
            }}
          >
            <DialogTitle>
              <Typography variant="h2">
                How would you like your content <br></br> to be unlocked?
              </Typography>
            </DialogTitle>
            <DialogActions>
              <IconButton sx={{ "&:hover": { backgroundColor: "transparent" } }}>
                <CloseIcon onClick={() => setOpen(false)} />
              </IconButton>
            </DialogActions>
          </Unstable_Grid2>
          <DialogContent>
            <UnlockTypeCardFactory />
          </DialogContent>
        </Unstable_Grid2>
      </Dialog>
    </div>
  );
};

export default SubmarineModal;
