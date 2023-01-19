import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, FormControl } from "@mui/material";
import { StripeCardElement } from "@stripe/stripe-js/types/stripe-js/elements/card";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { useAppDispatch } from "../../store/hooks";
import { setAlert } from "../../store/slices/alertSlice";
import { AlertType } from "../Alert";

interface CheckoutFormProps {
  handleAddCard: (token: string) => void;
}

const CheckoutForm = ({ handleAddCard }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsDisabled(true);
      if (!stripe || !elements) return;
      const cardElement: StripeCardElement | null = elements?.getElement(CardElement);
      // Use your card Element with other Stripe.js APIs
      if (!cardElement) {
        setAlert({ message: "Something went wrong", type: AlertType.Error });
        return;
      }

      const { error, token } = await stripe.createToken(cardElement);

      if (error) {
        console.log(error);
        const message = getErrorMessage(error);
        dispatch(setAlert({ message, type: AlertType.Error }));
        return;
      }

      if (token.id) {
        handleAddCard(token.id);
      } else {
        dispatch(setAlert({ message: "Invalid Payment Method Submitted", type: AlertType.Error }));
      }
    } catch (error) {
      dispatch(setAlert({ message: e.message, type: AlertType.Error }));
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column" }}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button type="submit" disabled={!stripe || isDisabled} sx={{ marginTop: 2 }}>
        Add Credit Card
      </Button>
    </Box>
  );
};

// @ts-ignore
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

interface PaymentMethodProps {
  handleAddCard: (token: string) => void;
}
const PaymentMethod = ({ handleAddCard }: PaymentMethodProps) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm handleAddCard={handleAddCard} />
  </Elements>
);

export default PaymentMethod;
