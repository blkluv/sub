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
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    width: "70vw",
    borderRadius: "30px",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  return (
    <Dialog
      PaperProps={{
        sx: { borderRadius: "30px", backgroundColor: "transparent", boxShadow: "none" },
      }}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <IconButton
        sx={{ zIndex: "2", position: "absolute", width: "fit-content", right: 20, top: 20 }}
      >
        <CloseIcon onClick={() => setOpen(false)} />
      </IconButton>
      <Unstable_Grid2 container direction={"column"} sx={{ gap: (theme) => theme.spacing(2) }}>
        <MainLandingContent missing={false} fileInfo={fileInfo} gatewayUrl={gatewayUrl} />
      </Unstable_Grid2>
    </Dialog>
  );
}
