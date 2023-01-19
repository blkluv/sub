import { useState } from "react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useAppDispatch } from "../../store/hooks";
import { doLogOut } from "../../store/slices/authSlice";
import { Button, Box, Modal, Typography, Unstable_Grid2 } from "@mui/material";
import Link from "next/link";

export default function UpgradeModal() {
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(doLogOut());
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Unstable_Grid2 container justifyContent={"flex-start"} spacing={1}>
          <ExclamationIcon style={{ width: "2rem", height: "2rem" }} aria-hidden="true" />
          <Typography id="modal-modal-title" variant="h6" component="h4">
            Upgrade Your Pinata Account
          </Typography>
        </Unstable_Grid2>
        <Typography variant="body1" id="modal-modal-description" sx={{ mt: 2 }}>
          Submarine.me is only available to Pinata customers with a paid plan and a Dedicated
          Gateway.
        </Typography>
        <Unstable_Grid2 container justifyContent={"flex-end"}>
          <Link href={"/billing"} passHref>
            <Button onClick={() => setOpen(false)}>Go Upgrade Today!</Button>
          </Link>
          <Button onClick={handleLogOut} variant="outlined">
            Logout
          </Button>
        </Unstable_Grid2>
      </Box>
    </Modal>
  );
}
