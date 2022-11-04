import { useAppSelector } from "../../store/hooks";
import { selectGatewayUrl } from "../../store/selectors/authSelectors";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import MainLandingContent from "./MainLandingContent";
import { Button, Modal, Box, Unstable_Grid2 } from "@mui/material";
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
    width: 550,
    borderRadius: "30px",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Unstable_Grid2
          container
          spacing={0}
          direction={"column"}
          sx={{ gap: (theme) => theme.spacing(2), alignItems: "center", maxHeight: "90%" }}
        >
          <MainLandingContent missing={false} fileInfo={fileInfo} gatewayUrl={gatewayUrl} />
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Unstable_Grid2>
      </Box>
    </Modal>
  );
}
