import {
  Dialog,
  DialogContent,
  IconButton,
  Divider,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UnlockTypeCardFactory from "./UnlockTypeCardFactory";

const SubmarineModal = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        disableEscapeKeyDown={true}
        PaperProps={{
          sx: {
            width: "65vw",
            height: "60vh",
            borderRadius: "30px",
            padding: "1rem",
          },
        }}
        maxWidth="lg"
      >
        <DialogContent>
          <Unstable_Grid2 container justifyContent={"space-between"}>
            <Typography sx={{ margin: "0 0 1rem 0" }} variant="h1">
              How you&apos;d like your submarined <br></br> content to be unlocked?
            </Typography>
            <IconButton>
              <CloseIcon onClick={() => setOpen(false)} />
            </IconButton>
          </Unstable_Grid2>
          <Divider />
          <UnlockTypeCardFactory />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmarineModal;
