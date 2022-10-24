import Image from "next/image";
import mint from "./mintAddress.png";
import InformationCircleIconStyled from "../../Form/InformationCircleIconStyled";
import { Box, Button, Modal, Typography, Unstable_Grid2 } from "@mui/material";

export default function MintAddressModal({
  mintAddressModalOpen: open,
  setMintAddressModalOpen: setOpen,
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
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Unstable_Grid2 container justifyContent={"flex-start"} direction="row" spacing={0}>
          <InformationCircleIconStyled style={{ color: (theme) => theme.palette.info.light }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            What is the mint address?
          </Typography>
        </Unstable_Grid2>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You can find this on most Solana NFT marketplaces by looking at the info about the NFT you
          own.
        </Typography>
        <Image src={mint} alt={"Mint Address"} layout="responsive" />
        <Unstable_Grid2
          container
          justifyContent={"flex-end"}
          sx={{ padding: (theme) => theme.spacing(1, 0, 0, 0) }}
        >
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Unstable_Grid2>
      </Box>
    </Modal>
  );
}
