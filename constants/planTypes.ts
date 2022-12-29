export const planTypes = {
  FREE: {
    type: 0,
    name: "Free",
    nickname: "Free",
  },
  PICNIC: {
    type: 1,
    name: "Standard",
    nickname: "Picnic",
  },
  FIESTA: {
    type: 2,
    name: "Premium",
    nickname: "Fiesta",
  },
  CARNIVAL: {
    type: 3,
    name: "Business",
    nickname: "Carnival",
  },
  ENTERPRISE: {
    type: 4,
    name: "Enterprise",
    nickname: "Enterprise",
  },
};

export const metricLimitInfo = {
  PLAN_OK: {
    title: "under-limit",
    color: "#FCE186",
    type: "success",
    text: "Limit is OK",
    value: 0,
  },
  PLAN_ABOVE_80: {
    title: "PLAN_ABOVE_80",
    color: "#FCE186",
    type: "warning",
    text: "Notice, you have exceeded 80% of your plan limit, please choose a larger plan.",
    value: 80,
  },
  PLAN_ABOVE_90: {
    title: "PLAN_ABOVE_90",
    color: "#FCE186",
    type: "warning",
    text: "Notice, you have exceeded 90% of your plan limit, please choose a larger plan.",
    value: 90,
  },
  PLAN_ABOVE_100: {
    title: "PLAN_ABOVE_100",
    color: "#FF6666",
    type: "error",
    text: "Notice, you have exceeded 100% of your plan limit, please choose a larger plan.",
    value: 100,
  },
  PLAN_ABOVE_110: {
    title: "PLAN_ABOVE_110",
    color: "#FF6666",
    type: "error",
    text: "Notice, you have exceeded 110% of your plan limit, please choose a larger plan.",
    value: 110,
  },
  PLAN_ABOVE_120: {
    title: "PLAN_ABOVE_120",
    color: "#FF6666",
    type: "error",
    text: "Notice, you have exceeded 120% of your plan limit, please choose a larger plan.",
    value: 120,
  },
  PLAN_ABOVE_125: {
    title: "PLAN_ABOVE_125",
    color: "#FF6666",
    type: "error",
    text: "Notice, you have exceeded 125% of your plan limit, please choose a larger plan.",
    value: 125,
  },
};
