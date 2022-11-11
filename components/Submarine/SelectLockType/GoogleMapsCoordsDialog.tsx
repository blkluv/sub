import Image from "next/image";
import maps from "./Location/googlemaps.png";
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

export default function GoogleMapsCoordsDialog({
  googleMapsDialogOpen: open,
  setGoogleMapsDialogOpen: setOpen,
}) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 950,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDialog-paper": {
          width: "70vw",
          borderRadius: "20px",
          padding: (theme) => theme.spacing(1),
        },
      }}
      maxWidth="md"
    >
      <DialogTitle sx={{ display: "flex", gap: ".5em" }}>
        <InformationCircleIconStyled style={{ color: (theme) => theme.palette.info.light }} />
        How can I find coordinates using Google Maps
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          By right clicking on the pin of an address you look up in Google Maps, you can get the
          latitude and longitude.
        </DialogContentText>
        <Image src={maps} alt="Google Maps" layout="responsive" />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
