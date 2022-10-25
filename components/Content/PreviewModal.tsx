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
    height: "80%",
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
        <Unstable_Grid2 container spacing={0} direction={"column"}>
          <MainLandingContent missing={false} fileInfo={fileInfo} gatewayUrl={gatewayUrl} />

          <Unstable_Grid2
            container
            justifyContent={"flex-end"}
            spacing={0}
            sx={{ padding: 1 }}
            direction={"row"}
          >
            <Button onClick={() => setOpen(false)} variant="outlined">
              Close
            </Button>
          </Unstable_Grid2>
        </Unstable_Grid2>
      </Box>
    </Modal>
  );
}
