import Image from "next/image";
import authority from "./update_authority.png";
import InformationCircleIconStyled from "../../Form/InformationCircleIconStyled";
import { Box, Button, Modal, Typography, Unstable_Grid2 } from "@mui/material";

export default function UpdateAuthorityModal({
  updateAuthorityModalOpen: open,
  setUpdateAuthorityModalOpen: setOpen,
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
            What is the update authority address?
          </Typography>
        </Unstable_Grid2>

        <Image src={authority} alt={"Update Authority"} layout="responsive" />
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
