import { DialogTitle, IconButton } from "@mui/material";

interface PinataDialogTitleProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const PinataDialogTitle = (props: PinataDialogTitleProps) => {
  return (
    <DialogTitle
      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: 0 }}
    >
      {props.children}
      <IconButton sx={{ padding: 0 }} aria-label="close" onClick={props.onClose}>
        <span aria-hidden="true">&times;</span>
      </IconButton>
    </DialogTitle>
  );
};
