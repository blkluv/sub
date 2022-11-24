import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function DeleteDialog({ file: fileProp, handleDelete, loadLinks, open, setOpen }) {
  const [file, setFile] = useState(fileProp);
  const deleteLink = async () => {
    if (!file.id) {
      throw "No file id";
    }
    await handleDelete(file.id);
    loadLinks(0);
    setOpen(false);
  };

  useEffect(() => {
    setFile(fileProp);
  }, [fileProp]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Delete submarined link</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete {file?.name}?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="error" onClick={deleteLink}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
