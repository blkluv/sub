import PaymentMethod from "./PaymentMethod";
import { Button, Dialog, DialogContent, Radio, RadioGroup, TextField } from "@mui/material";
import { PinataDialogTitle } from "../shared/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRef, useState } from "react";

interface AddCardModalProps {
  addCardModalOpen: boolean;
  setAddCardModalOpen: (open: boolean) => void;
  handleAddCard: (cardInfo: any) => void;
  handleAddCoupon?: (coupon: string) => void;
  allowCoupon?: boolean;
}

const AddCardModal = ({
  addCardModalOpen,
  setAddCardModalOpen,
  handleAddCard,
  handleAddCoupon,
  allowCoupon,
}: AddCardModalProps) => {
  const inputRef = useRef();
  const [paymentType, setPaymentType] = useState("card");
  const [coupon, setCoupon] = useState("");
  const handlePaymentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType((event.target as HTMLInputElement).value);
  };
  const content = allowCoupon ? (
    <>
      <RadioGroup
        row
        value={paymentType}
        onChange={handlePaymentTypeChange}
        sx={{
          marginBottom: "1rem",
        }}
      >
        <FormControlLabel
          value="card"
          control={<Radio size="small" />}
          label="Card"
          onClick={() => setAddCardModalOpen(true)}
        />
        <FormControlLabel
          value="coupon"
          control={<Radio size="small" />}
          label="Coupon"
          onClick={() => setAddCardModalOpen(true)}
        />
      </RadioGroup>

      {paymentType === "card" ? (
        <PaymentMethod handleAddCard={handleAddCard} />
      ) : (
        <>
          <TextField
            fullWidth
            id="coupon"
            name="coupon"
            type="text"
            required
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                coupon && handleAddCoupon && handleAddCoupon(coupon);
              }
            }}
            autoFocus
            placeholder="Coupon Code"
          />
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            disabled={!coupon}
            onClick={() => coupon && handleAddCoupon && handleAddCoupon(coupon)}
          >
            Add Coupon
          </Button>
        </>
      )}
    </>
  ) : (
    <PaymentMethod handleAddCard={handleAddCard} />
  );
  return (
    <Dialog open={addCardModalOpen} onClose={() => setAddCardModalOpen(false)}>
      <PinataDialogTitle onClose={() => setAddCardModalOpen(false)}>
        Add Payment Card {{ allowCoupon } && "or Coupon"}
      </PinataDialogTitle>
      <DialogContent sx={{ minWidth: "500px" }} dividers>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default AddCardModal;
