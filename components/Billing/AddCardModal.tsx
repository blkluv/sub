import PaymentMethod from "./PaymentMethod";
import { Dialog, DialogContent } from "@mui/material";
import { PinataDialogTitle } from "../shared/Dialog";

interface AddCardModalProps {
  addCardModalOpen: boolean;
  setAddCardModalOpen: (open: boolean) => void;
  handleAddCard: (cardInfo: any) => void;
}

const AddCardModal = ({
  addCardModalOpen,
  setAddCardModalOpen,
  handleAddCard,
}: AddCardModalProps) => {
  return (
    <Dialog open={addCardModalOpen} onClose={() => setAddCardModalOpen(false)}>
      <PinataDialogTitle onClose={() => setAddCardModalOpen(false)}>
        Add Payment Card
      </PinataDialogTitle>
      <DialogContent sx={{ minWidth: "500px" }} dividers>
        <PaymentMethod handleAddCard={handleAddCard} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCardModal;
