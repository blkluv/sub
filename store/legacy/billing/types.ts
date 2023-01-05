//Billing
export enum BillingActionNames {
  USER_STRIPE_CUSTOMER_RETRIEVED = "USER_STRIPE_CUSTOMER_RETRIEVED",
  USER_STRIPE_PAYMENT_SOURCE_CREATED = "USER_STRIPE_PAYMENT_SOURCE_CREATED",
  USER_BILLING_HISTORY = "USER_BILLING_HISTORY",
  BILLING_PLANS_RETRIEVED = "BILLING_PLANS_RETRIEVED",
  SET_ACTIVE_BILLING_PLAN = "SET_ACTIVE_BILLING_PLAN",
  UPDATE_BILLING_ADDRESS = "UPDATE_BILLING_ADDRESS",
  SET_STRIPE_COUPON = "SET_STRIPE_COUPON",
}

export interface Plan {
  bandwidth_limit_gb: number;
  gateway_count_limit: number;
  id: string;
  image_resize_requests_limit: number;
  link_shortening_requests_limit: number;
  name: "Free" | "Fiesta" | "Picnic" | "Carnival" | "PROFESSIONAL" | "INDIVIDUAL" | "FREE";
  isLegacy?: boolean;
  nickname: string;
  pin_total_limit: number;
  price: number;
  req_count_limit: number;
  storage_limit_gb: number;
  type: number;
  video_streaming_minutes_streamed_limit: number;
  video_streaming_minutes_stored_limit: number;
  submarine: boolean;
  authNFT: boolean;
}

export interface BillingPlan extends Plan {
  subtitle: string;
  features: string[];
}

export interface BillingHistory {
  due: number;
  error: any;
  id: any;
  invoicePdf: string;
  invoiceUrl: string;
  lines: {
    data: {
      amount: number;
      currency: string;
      description: string;
      discount_amounts: [];
      discountable: boolean;
      discounts: [];
      id: string;
      invoice_item: string;
      livemode: boolean;
      metadata: any;
      object: string;
    }[];
    has_more: boolean;
    object: string;
    total_count: number;
    url: string;
  };
  paid: boolean;
  period: { start: number; end: number };
  total: number;
  date: number;
}

export interface PaymentMethod {
  address_city: string | null;
  address_country: string | null;
  address_line1: string | null;
  address_line1_check: string | null;
  address_line2: string | null;
  address_state: string | null;
  address_zip: string | null;
  address_zip_check: string | null;
  brand: string;
  country: string;
  customer: string;
  cvc_check: string;
  dynamic_last4: string | null;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  id: string;
  isActive: boolean;
  last4: string;
  metadata: any;
  name: string | null;
  object: string;
  tokenization_method: string | null;
}

export interface BillingState {
  stripe_customer: {
    paymentMethods: PaymentMethod[];
    coupon: string;
    subscriptionItems: any[];
    address: any;
  };
  billing_history: any[];
  hasMore: boolean;
  billing_plans: BillingPlan[];
  activePricingPlan: Plan | null;
  nextBillingDate: string | null;
  nextPlan: Plan | null;
}
