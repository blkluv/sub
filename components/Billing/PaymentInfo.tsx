import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  createStripePaymentSource,
  detachStripeSourceFromCustomer,
  setDefaultCard,
} from "../../store/legacy/billing/billing.actions";

import AddCardModal from "./AddCardModal";
// import BillingAddressModal from "./BillingAddressModal";
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
} from "@mui/material";
import { GatewaysState } from "../../store/legacy/gateways/types";
import { BillingState, PaymentMethod } from "../../store/legacy/billing/types";
import { useAppDispatch } from "../../store/hooks";
import { setAlert } from "../../store/slices/alertSlice";

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
    dispatch(setAlert({ message: "Removing card...", type: "info" }));
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
            <span className="text-success">Default</span>
          ) : (
            <button
              onClick={() => setDefaultCard(method.customer, method.id)}
              className="pinata-link-button p-0"
            >
              Make Default
            </button>
          )}
        </TableCell>
        <TableCell>
          {!method.isActive && (
            <button
              onClick={() => handleOpenCardRemovalWindow(method)}
              className="pinata-link-button"
            >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </TableCell>
      </TableRow>
    );
  };

  const handleAddCard = async (tokenId: string) => {
    setOpenCardModal(false);
    try {
      dispatch(setAlert({ message: "Adding card...", type: "info" }));
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
          type: "error",
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
      dispatch(setAlert({ message: "You can only add 5 cards", type: "error" }));
    }
  };

  // const handleBillingAddressModal = () => {
  //   setOpenBillingAddressModal(true);
  // };

  return (
    <>
      <Card>
        <CardContent>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Typography variant="h6">Payment Info</Typography>
            <Button onClick={handleNewCardModal}>Add Card</Button>
          </div>
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
          {/*{Boolean(paymentMethods.length) && (*/}
          {/*  <button className="btn btn-sm btn-info" onClick={handleBillingAddressModal}>*/}
          {/*    Update My Billing Address*/}
          {/*  </button>*/}
          {/*)}*/}
        </CardContent>
      </Card>
      {openCardModal && (
        <AddCardModal
          setAddCardModalOpen={setOpenCardModal}
          addCardModalOpen={openCardModal}
          handleAddCard={handleAddCard}
        />
      )}
      {/* {openBillingAddressModal && (
        <BillingAddressModal
          setModalOpen={setOpenBillingAddressModal}
          modalIsOpen={openBillingAddressModal}
        />
      )} */}
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
