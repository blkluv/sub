import { useAppSelector } from "../../store/hooks";
import { selectGatewayUrl } from "../../store/selectors/authSelectors";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import MainLandingContent from "./MainLandingContent";
import { Unstable_Grid2, Dialog, Paper, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
interface PreviewModalProps {
  previewOpen;
  setPreviewOpen;
  fileInfo: MetadataUnlockInfo;
}
export default function PreviewModal({
  previewOpen: open,
  setPreviewOpen: setOpen,
  fileInfo,
}: PreviewModalProps) {
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: "30px",
          margin: "10px",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      onClose={() => setOpen(false)}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Unstable_Grid2 container direction={"column"} sx={{ gap: (theme) => theme.spacing(2) }}>
        <MainLandingContent fileInfo={fileInfo} gatewayUrl={gatewayUrl} />
      </Unstable_Grid2>
    </Dialog>
  );
}
