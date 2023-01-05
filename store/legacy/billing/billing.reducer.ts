import { makeDatePretty } from "../../../helpers/makeDatePretty";
import { BillingActionNames, BillingState } from "./types";

const initialState: BillingState = {
  stripe_customer: {
    paymentMethods: [],
    coupon: "",
    subscriptionItems: [],
    address: {
      country: "",
      postalCode: "",
    },
  },
  billing_history: [],
  hasMore: false,
  billing_plans: [],
  activePricingPlan: null,
  nextBillingDate: "",
  nextPlan: null,
};

const reducer = function (
  state: BillingState = initialState,
  action: { type: BillingActionNames; payload: any }
) {
  const { type, payload } = action;
  switch (type) {
    case BillingActionNames.USER_STRIPE_CUSTOMER_RETRIEVED: {
      const currentPayDate = payload?.nextBillingDate ? new Date(payload?.nextBillingDate) : null;
      const nextPayDate = currentPayDate ? makeDatePretty(currentPayDate.toISOString()) : null;
      return {
        ...state,
        stripe_customer: {
          paymentMethods: [...payload.sources],
          subscriptionItems: [...payload.subscriptionItems],
          address: {
            ...state.stripe_customer.address,
            country: payload?.address?.country ?? "",
            postalCode: payload?.address?.postal_code ?? "",
          },
        },
        nextBillingDate: nextPayDate,
        nextPlan: payload.nextPlan,
      };
    }
    case BillingActionNames.UPDATE_BILLING_ADDRESS: {
      return {
        ...state,
        stripe_customer: {
          ...state.stripe_customer,
          address: {
            ...state.stripe_customer.address,
            country: payload.country,
            postalCode: payload.postalCode,
          },
        },
      };
    }
    case BillingActionNames.SET_ACTIVE_BILLING_PLAN: {
      return {
        ...state,
        activePricingPlan: payload.plan,
        nextPlan: payload.nextPlan,
      };
    }
    case BillingActionNames.USER_STRIPE_PAYMENT_SOURCE_CREATED: {
      return {
        ...state,
        stripe_customer: {
          ...state.stripe_customer,
          paymentMethods: [...state.stripe_customer.paymentMethods, payload.source],
        },
      };
    }
    case BillingActionNames.USER_BILLING_HISTORY:
      return {
        ...state,
        billing_history: payload.data,
        hasMore: payload.hasMore,
      };
    case BillingActionNames.BILLING_PLANS_RETRIEVED:
      return {
        ...state,
        billing_plans: payload,
      };

    case BillingActionNames.SET_STRIPE_COUPON: {
      return {
        ...state,
        stripe_customer: {
          ...state.stripe_customer,
          coupon: payload.coupon,
        },
      };
    }
    default:
      return state;
  }
};
export default reducer;
