import { Dialog, Box, IconButton, Divider, Typography, Unstable_Grid2 } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UnlockTypeCardFactory from "./UnlockTypeCardFactory";

const SubmarineModal = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 900,
            borderRadius: "30px",
            padding: (theme) => theme.spacing(3),
          },
        }}
        maxWidth="lg"
      >
        <Unstable_Grid2
          container
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Typography sx={{ margin: (theme) => theme.spacing(0, 0, 2, 0) }} variant="h2">
            How you&apos;d like your submarined <br></br> content to be unlocked?
          </Typography>
          <IconButton sx={{ "&:hover": { backgroundColor: "transparent" } }}>
            <CloseIcon onClick={() => setOpen(false)} />
          </IconButton>
        </Unstable_Grid2>
        <Divider />
        <UnlockTypeCardFactory />
      </Dialog>
    </div>
  );
};

export default SubmarineModal;
