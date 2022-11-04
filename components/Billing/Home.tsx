import { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Button, Container, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import UsageCard from "./UsageCard";
import PlanSelector from "./PlanSelector";
import {
  retrieveStripeCustomer,
  createStripePaymentSource,
  detachStripeSourceFromCustomer,
  setDefaultCard,
  changePlan,
  getBillingHistory,
  getAllBillingPlans,
} from "../../store/legacy/billing/billing.actions";
import { getUsageMetrics } from "../../store/legacy/metrics/metrics.actions";
import { killGateways, checkUsage } from "../../store/legacy/gateways/gateway.actions";
import type { BillingState, Plan } from "../../store/legacy/billing/types";
import type { MetricsState } from "../../store/legacy/metrics/types";
import { PinataDialogTitle } from "../shared/Dialog";
import { planTypes } from "../../constants/planTypes";
import EnterpriseBanner from "./EnterpriseBanner";

interface BillingProps {
  data: any;
  retrieveStripeCustomer: any;
  billing: BillingState;
  changePlan: (newPlan: Plan) => any;
  gateways: { gateways: any };
  killGateways: any;
  metrics: MetricsState;
  getUsageMetrics: () => any;
  getAllBillingPlans: () => any;
}

const Home = (props: BillingProps) => {
  const {
    data,
    billing,
    changePlan,
    gateways: { gateways },
    getUsageMetrics,
    metrics,
    retrieveStripeCustomer,
    getAllBillingPlans,
  } = props;

  useEffect(() => {
    retrieveStripeCustomer();
    getAllBillingPlans();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingPlan, setUpdatingPlan] = useState(false);
  const [metricsInterval, setMetricsInterval] = useState<any>(null);
  //   const { search } = useLocation();
  const search = "a";
  const upgradeToEnterprise = new URLSearchParams(search).get("upgradeToEnterprise");

  useEffect(() => {
    if (upgradeToEnterprise) {
      location.href = "#enterprise-banner";
      //      handleEnterpriseContact();
    }
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    if (metricsInterval) {
      clearInterval(metricsInterval);
      setUpdatingPlan(false);
      //      window.Intercom("shutdown");
      const reloadTimeout = setTimeout(() => {
        // window.Intercom('boot', {
        //   app_id: process.env.REACT_APP_INTERCOM_ID
        // });
        getUsageMetrics();
      }, 1500);
      return () => clearTimeout(reloadTimeout);
    }
    setUpdatingPlan(false);
  }, [metrics.metrics.metricsAccount.fileCount.limit]);

  useEffect(() => {
    const timer = setInterval(getUsageMetrics, 60000);
    getUsageMetrics();
    return () => clearInterval(timer);
  }, []);

  const scheduleUsageMetrics = useMemo(() => {
    return () => {
      setUpdatingPlan(true);
      const updateInterval = setInterval(() => {
        getUsageMetrics();
      }, 2500);
      setMetricsInterval(updateInterval);
    };
  }, []);

  return (
    <Container maxWidth={"xl"}>
      {/* Show modal-notification for users who're using old-plan system */}
      {billing?.activePricingPlan?.isLegacy && (
        <Dialog open={isModalOpen}>
          <PinataDialogTitle onClose={() => setIsModalOpen(false)}>
            Pinata&apos;s Pricing is Changing
          </PinataDialogTitle>
          <DialogContent dividers>
            <p>
              As we mentioned in our email to all customers, Pinata&apos;s pricing is changing.
              These changes are to support continued growth and development as well as help
              customers better manage their usage. No one likes a surprise bill so we&apos;ve
              created a tiered pricing system that makes everything more predictable.
            </p>
            <Typography>
              <strong>You need to select a new plan</strong>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => setIsModalOpen(false)}>
              I understand
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Render Breadcrumbs */}
      <Typography variant="h3">Billing</Typography>
      {(billing?.activePricingPlan?.name || billing?.activePricingPlan?.isLegacy) && (
        <UsageCard
          data={data}
          billing={billing}
          changePlan={changePlan}
          updatingPlan={updatingPlan}
        />
      )}
      <PlanSelector
        data={data}
        billing={billing}
        changePlan={changePlan}
        gateways={gateways}
        scheduleUsageMetrics={scheduleUsageMetrics}
      />

      {billing?.activePricingPlan?.type !== planTypes.ENTERPRISE.type && <EnterpriseBanner />}
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    billing: state.billing,
    gateways: state.gateways,
    metrics: state.metrics,
  };
};

export default connect(mapStateToProps, {
  retrieveStripeCustomer,
  getAllBillingPlans,
  createStripePaymentSource,
  detachStripeSourceFromCustomer,
  setDefaultCard,
  changePlan,
  killGateways,
  checkUsage,
  getBillingHistory,
  getUsageMetrics,
})(Home);
