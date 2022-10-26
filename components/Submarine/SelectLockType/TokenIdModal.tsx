import { Box, Button, Modal, Typography, Unstable_Grid2 } from "@mui/material";
import InformationCircleIconStyled from "../../Form/InformationCircleIconStyled";

export default function TokenIdModal({ open, setOpen }) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
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
          <InformationCircleIconStyled style={{ color: (theme) => theme.palette.green[100] }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            What happens if I provide a token ID?
          </Typography>
        </Unstable_Grid2>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          If you provide a token ID, we will not only check to see an NFT from the collection is
          owned by the wallet, we will check if the specific token ID provided is owned by wallet.
        </Typography>
        <Unstable_Grid2 container justifyContent={"flex-end"}>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Unstable_Grid2>
      </Box>
    </Modal>
  );
}
