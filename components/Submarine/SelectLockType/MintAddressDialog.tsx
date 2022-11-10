import Image from "next/image";
import mint from "./mintAddress.png";
import InformationCircleIconStyled from "../../Form/InformationCircleIconStyled";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from "@mui/material";

export default function MintAddressDialog({
  mintAddressDialogOpen: open,
  setMintAddressDialogOpen: setOpen,
}) {
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
        <InformationCircleIconStyled style={{ color: (theme) => theme.palette.info.light }} />
        What is the mint address?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can find this on most Solana NFT marketplaces by looking at the info about the NFT you
          own.
        </DialogContentText>
        <Image src={mint} alt={"Mint Address"} layout="responsive" />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
