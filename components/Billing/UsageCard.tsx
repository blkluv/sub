import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PaymentInfo from "./PaymentInfo";
import BillingHistory from "./BillingHistory";
import CurrentPlanInfo from "./CurrentPlanInfo";
import { retrieveStripeCustomer } from "../../store/legacy/billing/billing.actions";
import { BillingState, Plan } from "../../store/legacy/billing/types";
import { CircularProgress, Grid, Typography } from "@mui/material";
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
    <Grid
      container
      sx={{
        marginBottom: 2,
        flexWrap: { md: "nowrap" },
        columnGap: { md: 2 },
      }}
    >
      <Grid item xs={12} md={6}>
        {updatingPlan ? (
          <div className="updating-plan-spinner">
            <Typography>We&apos;re updating your plan</Typography>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <CurrentPlanInfo billing={billing} />
        )}
      </Grid>
      <Grid item xs={12} md={6} className="d-flex flex-column justify-content-between">
        <PaymentInfo openCardModal={openCardModal} setOpenCardModal={setOpenCardModal} />
        <BillingHistory />
      </Grid>
    </Grid>
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
