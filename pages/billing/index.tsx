import { useEffect } from "react";
import BillingForm from "../../components/Billing/Home";
import PrivateLayout from "../../components/Layout";

import { getUsageMetrics } from "../../store/legacy/metrics/metrics.actions";
import {
  getAllBillingPlans,
  retrieveStripeCustomer,
} from "../../store/legacy/billing/billing.actions";

import { loadUserInfo } from "../../store/legacy/user/user.actions";
import { connect } from "react-redux";
const Billing = ({ user }) => {
  const initializePricing = async () => {
    await retrieveStripeCustomer();
    await getUsageMetrics();
  };

  useEffect(() => {
    if (user?.user?.email) {
      initializePricing();
      getAllBillingPlans();
    }
  }, [user?.user]);
  return (
    <>
      <PrivateLayout>
        <BillingForm />
      </PrivateLayout>
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  loadUserInfo,
  getUsageMetrics,
  retrieveStripeCustomer,
  getAllBillingPlans,
})(Billing);
