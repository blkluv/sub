/* This example requires Tailwind CSS v2.0+ */
import { Button, Modal, Typography, Unstable_Grid2 } from "@mui/material";
import { Box } from "@mui/system";

export default function DeleteModal({ file, handleDelete, loadLinks, open, setOpen }) {
  const deleteLink = async () => {
    if (!file.id) {
      throw "No file id";
    }
    await handleDelete(file.id);
    loadLinks(0);
    setOpen(false);
  };

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
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete submarined link
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete {file?.name}?
        </Typography>
        <Unstable_Grid2 container justifyContent={"flex-end"}>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={deleteLink} color="error">
            Delete
          </Button>
        </Unstable_Grid2>
      </Box>
    </Modal>
  );
}
