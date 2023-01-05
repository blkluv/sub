import { BillingActionNames, Plan } from "./types";
import { setAlert } from "../../slices/alertSlice";

interface SubscriptionItem {
  createdAt: string;
  current_period_end: any;
  current_period_start: any;
  is_deleted: boolean;
  quantity: string;
  stripe_created: any;
  stripe_subscription_id: string;
  stripe_subscription_item_id: string;
  type: "1" | "2" | "3" | "4" | "PROFESSIONAL" | "INDIVIDUAL";
  updatedAt: string;
  user_id: string;
}

interface IStripeCustomerBillingAddress {
  country: string;
  postal_code: string;
}

interface UserStripeConsumer {
  plan: Plan | null;
  nextPlan: Plan | null;
  subscriptionItems: SubscriptionItem[];
  address: IStripeCustomerBillingAddress;
  nextBillingDate: string;
}

import { api } from "../fakeAxios";
import { planTypes } from "../../../constants/planTypes";
export const retrieveStripeCustomer = () => async (dispatch: any) => {
  try {
    let { data }: { data: UserStripeConsumer } = await api.get(`billing/userStripeCustomer`);
    let { plan, subscriptionItems, nextPlan } = data;

    dispatch({ type: BillingActionNames.USER_STRIPE_CUSTOMER_RETRIEVED, payload: data });
    // if plan === null -> it's a old-plan user
    if (!plan) {
      let legacyPlanData = {};
      if (subscriptionItems.length > 0) {
        // its a legacy pro plan
        const oldPlan = subscriptionItems.find(
          (el: SubscriptionItem) => el.type === "PROFESSIONAL" || el.type === "INDIVIDUAL"
        );
        legacyPlanData = {
          name: oldPlan?.type,
          price: oldPlan?.type === "PROFESSIONAL" ? "$20" : "",
          storage_limit_gb: oldPlan?.type === "PROFESSIONAL" ? "1" : "",
          isLegacy: true,
        };
      } else if (!subscriptionItems.length) {
        // its a legacy free plan
        legacyPlanData = {
          name: "FREE",
          isLegacy: true,
        };
      }
      dispatch({
        type: BillingActionNames.SET_ACTIVE_BILLING_PLAN,
        payload: { plan: legacyPlanData, nextPlan },
      });
    } else {
      dispatch({ type: BillingActionNames.SET_ACTIVE_BILLING_PLAN, payload: { plan, nextPlan } });
    }
  } catch (error) {
    console.log({ error });
    //    Sentry.captureException(error);
    return Promise.reject();
  }
};

export const createStripePaymentSource = (sourceId: any) => async (dispatch: any) => {
  try {
    const response = await api.post("billing/createStripePaymentSource", {
      sourceId: sourceId,
    });
    dispatch(setAlert({ message: "Card added!", type: "success" }));
    dispatch({
      type: BillingActionNames.USER_STRIPE_PAYMENT_SOURCE_CREATED,
      payload: response?.data,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const detachStripeSourceFromCustomer = (sourceId: any) => async (dispatch: any) => {
  try {
    await api.post("billing/detachStripeSourceFromCustomer", {
      sourceId: sourceId,
    });
    dispatch(retrieveStripeCustomer());
    dispatch(setAlert({ message: "Card Removed", type: "success" }));
  } catch (error) {
    console.log(error);
  }
};

export const setDefaultCard = (customerId: any, sourceId: any) => async (dispatch: any) => {
  try {
    await api.put("billing/updateStripeSource", { customerId, sourceId });
    dispatch(setAlert({ message: "Default card updated!", type: "success" }));
    dispatch(retrieveStripeCustomer());
  } catch (error) {
    console.log(error);
  }
};

export const changePlan = (newPlan: Plan, coupon?: string) => async (dispatch: any) => {
  try {
    // await trackEvent("plan-change", {
    //   new_plan_name: newPlan.name,
    // });
    const url = coupon ? "billing/changePinataPlanWithCoupon" : "billing/changePinataPlan";
    const { data } = await api.post(url, {
      desiredPlanId: newPlan.id,
      coupon,
    });

    if (data) {
      if (data?.nextPlan) {
        dispatch(
          setAlert({
            message: `Your plan will change to ${newPlan.nickname} at the end of the current billing period`,
            type: "success",
          })
        );
      } else {
        dispatch(setAlert({ message: `Plan updated to ${newPlan.nickname}!`, type: "success" }));
      }
      dispatch(retrieveStripeCustomer());
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const getBillingHistory =
  (limit: number, startingAfter: any, endingBefore: any) => async (dispatch: any) => {
    try {
      const history = await api.get(
        `billing/history?limit=${limit}&startingAfter=${startingAfter}&endingBefore=${endingBefore}`
      );
      dispatch({
        type: BillingActionNames.USER_BILLING_HISTORY,
        payload: history?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getAllBillingPlans = () => async (dispatch: any) => {
  try {
    const response = await api.get("plans");
    const pricingArr = response?.data?.map((plan: Plan) => {
      let subtitle = "";
      switch (plan.type) {
        case planTypes.FREE.type: {
          subtitle = "Perfect plan for starters";
          break;
        }
        case planTypes.PICNIC.type: {
          subtitle = "A place for your digital world";
          break;
        }
        case planTypes.FIESTA.type: {
          subtitle = "Your premium choice";
          break;
        }
        case planTypes.CARNIVAL.type: {
          subtitle = "Speed at scale";
          break;
        }
      }

      // dynamicaly construct arr and then filter falsy values
      const listOfFeatures = [
        plan.pin_total_limit > 0 && `${plan.pin_total_limit.toLocaleString()} pinned files`,
        plan.storage_limit_gb > 0 && `${plan.storage_limit_gb.toLocaleString()} GB of storage`,
        plan.gateway_count_limit > 0 &&
          `${plan.gateway_count_limit.toLocaleString()} ${
            plan.gateway_count_limit > 1 ? "gateways" : "gateway"
          } `,
        // plan.bandwidth_limit_gb > 0 &&
        //   `${plan.bandwidth_limit_gb.toLocaleString()} GB gateway bandwidth`,
        plan.req_count_limit > 0 && `${plan.req_count_limit.toLocaleString()} requests`,
        // plan.link_shortening_requests_limit > 0 &&
        //   `${plan.link_shortening_requests_limit.toLocaleString()} shortened link requests`,
        // plan.video_streaming_minutes_stored_limit > 0 &&
        //   `${plan.video_streaming_minutes_stored_limit.toLocaleString()} video minutes stored`,
        // plan.video_streaming_minutes_streamed_limit > 0 &&
        //   `${plan.video_streaming_minutes_streamed_limit.toLocaleString()} video minutes streamed`,
        // plan.image_resize_requests_limit > 0 &&
        //   `${plan.image_resize_requests_limit.toLocaleString()} image resize requests`,
      ].filter(Boolean);

      const subtitlePlan = {
        ...plan,
        subtitle,
        features: listOfFeatures,
      };
      return subtitlePlan;
    });
    dispatch({ type: BillingActionNames.BILLING_PLANS_RETRIEVED, payload: pricingArr });
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomerBillingAddress =
  (addressInfo: { country: string; postal_code: string }) => async (dispatch: any) => {
    try {
      const response = await updateStripeCustomerBillingAddress(addressInfo);
      dispatch({
        type: BillingActionNames.UPDATE_BILLING_ADDRESS,
        payload: {
          country: response?.country,
          postalCode: response?.postal_code,
        },
      });
      dispatch(setAlert({ message: "Billing address updated!", type: "success" }));
    } catch (error) {
      dispatch(setAlert({ message: "Update Address Error", type: "error" }));
      console.log(error);
      throw error;
    }
  };

interface IStripeCustomerBillingAddress {
  country: string;
  postal_code: string;
}

export const updateStripeCustomerBillingAddress = async (
  stripeCustomerBillingAddress: IStripeCustomerBillingAddress
): Promise<any> => {
  try {
    const { data } = await api.put(
      "users/stripeCustomerBillingAddress",
      stripeCustomerBillingAddress
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
