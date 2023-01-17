import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PaymentInfo from "./PaymentInfo";
import BillingHistory from "./BillingHistory";
import CurrentPlanInfo from "./CurrentPlanInfo";
import { retrieveStripeCustomer } from "../../store/legacy/billing/billing.actions";
import { BillingState, Plan } from "../../store/legacy/billing/types";
import { Box, CircularProgress, Grid, Typography, Unstable_Grid2 } from "@mui/material";
import { createGateway } from "../../store/legacy/gateways/gateway.actions";

interface UsageCardProps {
  data: any;
  billing: BillingState;
  apiKeys: any;
  updatingPlan: boolean;
}

const UsageCard = ({ billing, updatingPlan }: UsageCardProps) => {
  const [openCardModal, setOpenCardModal] = useState(false); //Boolean or null if no default

  // Scroll to anchor hash
  useEffect(() => {
    const scrollToHashElement = () => {
      const { hash } = window.location;
      const elementToScroll = document.getElementById(hash?.replace("#", ""));

      if (!elementToScroll) return;

      window.scrollTo({
        top: elementToScroll.offsetTop - 75,
        behavior: "smooth",
      });
    };

    scrollToHashElement();
    window.addEventListener("hashchange", scrollToHashElement);
    return window.removeEventListener("hashchange", scrollToHashElement);
  }, []);

  return (
    <Unstable_Grid2
      container
      sx={{
        marginTop: "1rem",
        flexWrap: { md: "nowrap" },
        columnGap: { xs: 0, md: 2 },
        padding: { xs: 2, md: 0 },
      }}
      spacing={1}
    >
      <Unstable_Grid2 xs={12} md={6}>
        {updatingPlan ? (
          <Unstable_Grid2
            container
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
            sx={{ height: "100%" }}
          >
            <Typography>We&apos;re updating your plan</Typography>
            <CircularProgress color="primary" />
          </Unstable_Grid2>
        ) : (
          <CurrentPlanInfo billing={billing} />
        )}
      </Unstable_Grid2>
      <Unstable_Grid2 container xs={12} md={6} direction={"column"}>
        <PaymentInfo openCardModal={openCardModal} setOpenCardModal={setOpenCardModal} />
        <BillingHistory />
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};

const mapDispatchToProps = {
  retrieveStripeCustomer,
  createGateway,
};

const mapStateToProps = (state: any) => {
  return {
    apiKeys: state.apiKeys,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsageCard);
