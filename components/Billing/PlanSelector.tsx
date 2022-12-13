import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { connect } from "react-redux";
// import { useLocation } from "react-router-dom";
import { Grid, Alert, Unstable_Grid2, Button } from "@mui/material";
import CardPricing from "./Pricing/CardPricing";
//import BillingAddressModal from "./BillingAddressModal";
import AddCardModal from "./AddCardModal";
import { AfterUpdatePlanDialog } from "./AfterUpdatePlanDialog";
import { loadUserInfo, restoreCanceledAccount } from "../../store/legacy/user/user.actions";
import {
  createStripePaymentSource,
  retrieveStripeCustomer,
} from "../../store/legacy/billing/billing.actions";
import { createGateway } from "../../store/legacy/gateways/gateway.actions";
import type { Gateways } from "../../store/legacy/gateways/types";
import type { BillingPlan, BillingState, Plan } from "../../store/legacy/billing/types";
import { planTypes } from "../../constants/planTypes";
import { useAppDispatch } from "../../store/hooks";
import { setAlert } from "../../store/slices/alertSlice";
import { User, UserState } from "../../store/legacy/user/types";
import ConfirmationModal from "../shared/ConfirmationModal";
import * as FullStory from "@fullstory/browser";

interface ChangePlanRes {
  plan: Plan;
  nextPlan: Plan;
}

interface PlanSelectorProps {
  data: any;
  billing: BillingState;
  changePlan: (newPlan: Plan) => Promise<ChangePlanRes>;
  gateways: Gateways;
  user: UserState;
  apiKeys: any;
  restoreCanceledAccount: () => void;
  loadUserInfo: (user: User) => Promise<any>;
  createGateway: (gatewayInfo: { subdomain: string; restricted?: boolean }, update: boolean) => any;
  createStripePaymentSource: (...props: any) => any;
  scheduleUsageMetrics: (...props: any) => any;
}

const PlanSelector = ({
  billing,
  changePlan,
  gateways,
  user,
  restoreCanceledAccount,
  loadUserInfo,
  createGateway,
  createStripePaymentSource,
  scheduleUsageMetrics,
}: PlanSelectorProps) => {
  const [changePlanModalOpen, setChangePlanModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planToChangeTo, setPlanChoice] = useState<Plan>(null);
  const [planChoiceConfirmationOpen, setPlanChangeConfirmationOpen] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false); //Boolean or null if no default
  const [openBillingAddressModal, setOpenBillingAddressModal] = useState(false);
  const [restorePlanModalOpen, setRestorePlanModalOpen] = useState(false);
  const [afterUpdateDialogProps, setAfterUpdateDialogProps] = useState<{
    newPlan: Plan;
    gateways: Gateways;
  } | null>(null);

  const dispatch = useAppDispatch();

  const changePlanLocal = async (planToChangeTo: Plan) => {
    try {
      const changePlanRes: ChangePlanRes = await changePlan(planToChangeTo);
      if (!changePlanRes.nextPlan) {
        scheduleUsageMetrics();
        setAfterUpdateDialogProps({ newPlan: changePlanRes.plan, gateways });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (tokenId: string) => {
    setOpenCardModal(false);
    try {
      dispatch(setAlert({ message: "Adding card...", type: "info" }));
      const stripeRes = await createStripePaymentSource(tokenId);
      if (stripeRes) {
        setPlanChangeConfirmationOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // // Scroll to anchor hash
  // useEffect(() => {
  //   const scrollToHashElement = () => {
  //     const { hash } = window.location;
  //     const elementToScroll = document.getElementById(hash?.replace("#", ""));

  //     if (!elementToScroll) return;

  //     window.scrollTo({
  //       top: elementToScroll.offsetTop - 75,
  //       behavior: "smooth",
  //     });
  //   };

  //   scrollToHashElement();
  //   window.addEventListener("hashchange", scrollToHashElement);
  //   return window.removeEventListener("hashchange", scrollToHashElement);
  // }, []);

  // useEffect(() => {
  //   // check if user came from marketing site and wants to change plan
  //   if (location?.state?.registerFromMarketing) {
  //     const currentPlan = billing?.activePricingPlan;
  //     const desiredPlan = billing?.billing_plans?.find(
  //       (item) => item.nickname === location?.state?.desiredPlan
  //     );
  //     if (desiredPlan && currentPlan) {
  //       handlePlanChoice(desiredPlan);
  //       localStorage.removeItem("pinata-registration-plan-selection");
  //     }
  //   }
  // }, []);

  const handlePlanChoice = async (plan: Plan) => {
    setPlanChoice(plan);
    if (!billing.stripe_customer.paymentMethods.length && plan.type !== planTypes.FREE.type) {
      // if there is no payment method -> add credit card
      setOpenCardModal(true);
      return;
    }
    if (user.user?.scheduledToBeCancelledAt) {
      setRestorePlanModalOpen(true);
    } else if (
      (billing?.activePricingPlan &&
        plan.id !== billing?.activePricingPlan?.id &&
        plan.type > billing?.activePricingPlan?.type) ||
      billing?.activePricingPlan?.isLegacy
    ) {
      // if planToChange's type is greater than current - we just confirm and change it
      setPlanChangeConfirmationOpen(true);
    } else {
      // Need to kill off gateways and alert them
      setChangePlanModalOpen(true);
    }
  };

  const confirmProfessionalUpgrade = async () => {
    setLoading(true);

    console.log({ user });
    try {
      if (billing.stripe_customer) {
        FullStory.event("Upgrade plan", {
          userEmail: user.user.email,
          newPlan: planToChangeTo.name,
        });
        await changePlanLocal(planToChangeTo);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPlanChangeConfirmationOpen(false);
    }
  };

  const confirmRestorePlan = async () => {
    setLoading(true);
    try {
      await restoreCanceledAccount();
    } catch (error) {
      console.log(error);
    } finally {
      if (user.user) {
        await loadUserInfo(user.user);
      }
      setRestorePlanModalOpen(false);
    }
  };

  const confirmDowngrade = async () => {
    setLoading(true);
    try {
      await changePlanLocal(planToChangeTo);
      FullStory.event("Downgrade plan", {
        userEmail: user.user.email,
        newPlan: planToChangeTo.name,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setChangePlanModalOpen(false);
    }
  };

  const getChangePlanText = useMemo(() => {
    return (
      <>
        <p>
          {!billing?.activePricingPlan?.isLegacy && planToChangeTo?.type === planTypes.FREE.type
            ? `By downgrading your plan, any dedicated gateways you've created will be removed and you won't be able to access them.`
            : billing?.activePricingPlan?.isLegacy
            ? `Are you sure you want to change your plan?`
            : billing?.activePricingPlan?.type === planToChangeTo?.type
            ? "Are you sure you want to cancel your downgrade and keep your current plan?"
            : `Are you sure you want to downgrade? If your usage exceeds 125% of the plan you downgrade to, your account will be locked.`}
          {planToChangeTo?.type === planTypes.FREE.type
            ? "Also the payments methods will be removed at the end of the billing period."
            : ""}
        </p>
        {billing?.nextBillingDate && billing?.activePricingPlan?.type !== planToChangeTo?.type && (
          <p>
            This change will take effect on <strong>{billing?.nextBillingDate}</strong>. Please
            continue to enjoy the features of the{" "}
            <strong>{billing?.activePricingPlan?.nickname}</strong> until then.
          </p>
        )}
      </>
    );
  }, [billing?.activePricingPlan, billing?.nextBillingDate, planToChangeTo]);

  return (
    <>
      {billing?.activePricingPlan?.type === planTypes.ENTERPRISE.type ? (
        <Alert color="info">
          Please <a href="mailto:sales@pinata.cloud">contact</a> your account manager to adjust your
          plan.
        </Alert>
      ) : (
        !!billing?.billing_plans?.length && (
          <Unstable_Grid2 container spacing={"1rem"}>
            {billing?.billing_plans.map((pricing: BillingPlan) => (
              <Unstable_Grid2 key={pricing.id} sm={3} xs={12}>
                <CardPricing
                  disabled={pricing.type === planTypes.FREE.type}
                  plan={pricing}
                  action={handlePlanChoice}
                  currentPlan={billing?.activePricingPlan}
                  nextPlan={billing?.nextPlan}
                />
              </Unstable_Grid2>
            ))}
          </Unstable_Grid2>
        )
      )}
      {changePlanModalOpen && (
        <ConfirmationModal
          title="Change Plan?"
          content={getChangePlanText}
          modalOpen={changePlanModalOpen}
          toggleModal={setChangePlanModalOpen}
          loading={loading}
          action={confirmDowngrade}
        />
      )}
      {planChoiceConfirmationOpen && (
        <ConfirmationModal
          title={`Upgrade to ${planToChangeTo.nickname}?`}
          content={`Are you sure you want to upgrade to the ${planToChangeTo.nickname} plan for $${planToChangeTo.price}/month?`}
          modalOpen={planChoiceConfirmationOpen}
          toggleModal={setPlanChangeConfirmationOpen}
          loading={loading}
          action={confirmProfessionalUpgrade}
        />
      )}
      {restorePlanModalOpen && (
        <ConfirmationModal
          title={`Restore Plan?`}
          content={`Your plan is scheduled to be cancelled by ${dayjs(
            user.user?.scheduledToBeCancelledAt
          ).format(
            "YYYY-MM-DD"
          )}, in order to change your plan you need first to restore your plan`}
          modalOpen={restorePlanModalOpen}
          toggleModal={setRestorePlanModalOpen}
          loading={loading}
          action={confirmRestorePlan}
        />
      )}
      {/* {openBillingAddressModal && (
        <BillingAddressModal
          setModalOpen={setOpenBillingAddressModal}
          modalIsOpen={openBillingAddressModal}
          mainActionHandler={() => changePlan(planToChangeTo)}
        />
      )} */}
      {openCardModal && (
        <AddCardModal
          setAddCardModalOpen={setOpenCardModal}
          addCardModalOpen={openCardModal}
          handleAddCard={handleAddCard}
        />
      )}
      {afterUpdateDialogProps !== null && (
        <AfterUpdatePlanDialog
          createGateway={createGateway}
          newPlan={afterUpdateDialogProps.newPlan}
          gateways={gateways}
          onClose={() => {
            setAfterUpdateDialogProps(null);
          }}
        />
      )}
    </>
  );
};

const mapDispatchToProps = {
  restoreCanceledAccount,
  loadUserInfo,
  retrieveStripeCustomer,
  createGateway,
  createStripePaymentSource,
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    apiKeys: state.apiKeys,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanSelector);
