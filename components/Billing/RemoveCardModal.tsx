import { Button, Dialog, DialogContent, Typography } from "@mui/material";
// import { PaymentMethod } from "../../store/billing/types";
import { PinataDialogTitle } from "../shared/Dialog";

interface RemoveCardModalProps {
  cardInfo: PaymentMethod | null;
  removeCardModalOpen: boolean;
  setRemoveCardModalOpen: (open: boolean) => void;
  confirmRemoveCard: (cardInfo: any) => void;
}

const RemoveCardModal = ({
  cardInfo,
  removeCardModalOpen,
  setRemoveCardModalOpen,
  confirmRemoveCard,
}: RemoveCardModalProps) => {
  return (
    <Dialog open={removeCardModalOpen} onClose={() => setRemoveCardModalOpen(false)}>
      <PinataDialogTitle onClose={() => setRemoveCardModalOpen(false)}>
        Remove Payment Card
      </PinataDialogTitle>
      <DialogContent dividers>
        <Typography variant={"h6"}>Are you sure you want to remove this card?</Typography>
        {cardInfo && (
          <div>
            <p style={{ fontSize: 18, marginTop: 20, marginBottom: 20 }}>
              {cardInfo.brand} ending in {cardInfo.last4}
            </p>

            <Button onClick={() => confirmRemoveCard(cardInfo)} color={"error"}>
              Remove
            </Button>
            <Button onClick={() => setRemoveCardModalOpen(false)} variant="text">
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RemoveCardModal;
