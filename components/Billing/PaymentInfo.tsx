import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  createStripePaymentSource,
  detachStripeSourceFromCustomer,
  setDefaultCard,
} from "../../store/legacy/billing/billing.actions";

import AddCardModal from "./AddCardModal";
import RemoveCardModal from "./RemoveCardModal";
import {
  CardContent,
  Card,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  Button,
  Unstable_Grid2,
  IconButton,
} from "@mui/material";
import { GatewaysState } from "../../store/legacy/gateways/types";
import { BillingState, PaymentMethod } from "../../store/legacy/billing/types";
import { useAppDispatch } from "../../store/hooks";
import { setAlert } from "../../store/slices/alertSlice";
import DeleteIcon from "@mui/icons-material/Delete";
const CARDS_ALLOWED = 5;

interface PaymentInfoProps {
  billing: BillingState;
  createStripePaymentSource: any;
  detachStripeSourceFromCustomer: any;
  setDefaultCard: any;
  gateways: GatewaysState;
  openCardModal: any;
  setOpenCardModal: any;
}

function PaymentInfo(props: PaymentInfoProps) {
  const [removeCardModalOpen, setRemoveCardModalOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState<PaymentMethod | null>(null);
  const [openBillingAddressModal, setOpenBillingAddressModal] = useState(false);
  const {
    billing,
    gateways,
    createStripePaymentSource,
    detachStripeSourceFromCustomer,
    setDefaultCard,
    openCardModal,
    setOpenCardModal,
  } = props;
  const paymentMethods = billing?.stripe_customer?.paymentMethods;

  useEffect(() => {}, [openBillingAddressModal]);

  const dispatch = useAppDispatch();
  const confirmRemoveCard = async (card: { id: any }) => {
    dispatch(setAlert({ message: "Removing card...", type: AlertType.Info }));
    setRemoveCardModalOpen(false);
    setCardInfo(null);
    await detachStripeSourceFromCustomer(card.id);
  };

  const renderPaymentMethods = (method: any) => {
    return (
      <TableRow key={method.id}>
        <TableCell>{method.brand}</TableCell>
        <TableCell>{method.last4}</TableCell>
        <TableCell>{`${method.exp_month}/${method.exp_year}`}</TableCell>
        <TableCell>
          {method.isActive ? (
            <span style={{ color: "#28a745", fontWeight: 600 }}>Default</span>
          ) : (
            <Button
              sx={{
                padding: 0,
                borderRadius: "1rem",
                fontSize: "0.75rem",
                height: "1.5rem",
                width: "6rem",
              }}
              size="small"
              onClick={() => setDefaultCard(method.customer, method.id)}
            >
              Make Default
            </Button>
          )}
        </TableCell>
        <TableCell>
          {!method.isActive && (
            <IconButton
              onClick={() => handleOpenCardRemovalWindow(method)}
              sx={{
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                color: "#495057",
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    );
  };

  const handleAddCard = async (tokenId: string) => {
    setOpenCardModal(false);
    try {
      dispatch(setAlert({ message: "Adding card...", type: AlertType.Info }));
      await createStripePaymentSource(tokenId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenCardRemovalWindow = (paymentMethod: any) => {
    const hasGateways = gateways?.gateways?.rows?.length;
    if (hasGateways && paymentMethods.length === 1) {
      dispatch(
        setAlert({
          message: "You cannot remove your card when you have active dedicated gateways",
          type: AlertType.Error,
        })
      );
      return;
    }

    setRemoveCardModalOpen(true);
    setCardInfo(paymentMethod);
  };

  const handleNewCardModal = () => {
    if (paymentMethods.length < CARDS_ALLOWED) {
      setOpenCardModal(true);
    } else {
      dispatch(setAlert({ message: "You can only add 5 cards", type: AlertType.Error }));
    }
  };

  // const handleBillingAddressModal = () => {
  //   setOpenBillingAddressModal(true);
  // };

  return (
    <>
      <Card>
        <CardContent>
          <Unstable_Grid2
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ marginBottom: "1rem" }}
          >
            <Typography variant="h6">Payment Info</Typography>
            <Button onClick={handleNewCardModal}>Add Card</Button>
          </Unstable_Grid2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell scope="col">Brand</TableCell>
                <TableCell scope="col">Last 4</TableCell>
                <TableCell scope="col">Expiration</TableCell>
                <TableCell scope="col">Default</TableCell>
                <TableCell scope="col"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{paymentMethods.map((pm) => renderPaymentMethods(pm))}</TableBody>
          </Table>
        </CardContent>
      </Card>
      {openCardModal && (
        <AddCardModal
          setAddCardModalOpen={setOpenCardModal}
          addCardModalOpen={openCardModal}
          handleAddCard={handleAddCard}
        />
      )}
      {removeCardModalOpen && (
        <RemoveCardModal
          removeCardModalOpen={removeCardModalOpen}
          setRemoveCardModalOpen={setRemoveCardModalOpen}
          cardInfo={cardInfo}
          confirmRemoveCard={confirmRemoveCard}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  billing: state?.billing,
  gateways: state?.gateways,
});

const mapDispatchToProps = {
  setDefaultCard,
  createStripePaymentSource,
  detachStripeSourceFromCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);
