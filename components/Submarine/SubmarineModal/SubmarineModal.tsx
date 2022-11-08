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
            width: "65vw",
            borderRadius: "30px",
          },
        }}
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
            <Typography variant="h2">
              How you&apos;d like your submarined <br></br> content to be unlocked?
            </Typography>
            <IconButton sx={{ "&:hover": { backgroundColor: "transparent" } }}>
              <CloseIcon onClick={() => setOpen(false)} />
            </IconButton>
          </Unstable_Grid2>
          <Divider sx={{ width: "100%" }} />
          <Unstable_Grid2
            container
            sx={{
              margin: (theme) => theme.spacing(2, 0, 2, 0),
              padding: (theme) => theme.spacing(0, 3, 0, 3),
            }}
          >
            <UnlockTypeCardFactory />
          </Unstable_Grid2>
        </Unstable_Grid2>
      </Dialog>
    </div>
  );
};

export default SubmarineModal;
