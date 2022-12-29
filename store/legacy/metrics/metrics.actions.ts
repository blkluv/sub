import { metricLimitInfo, planTypes } from "../../../constants/planTypes";
import { metricsApi } from "../fakeAxios";
import { MetricsActionsTypes, UsageStatus, UsageMetrics, Metrics } from "./types";

export const getUsageMetrics = () => async (dispatch: any, getState: any) => {
  console.log("Here function ");
  const {
    billing: { activePricingPlan },
  } = getState();
  try {
    const metricsRes = await metricsApi.get("metrics/status");

    dispatch({
      type: MetricsActionsTypes.USAGE_STATUS_RECEIVED,
      payload: {
        metrics: metricsRes.data,
      },
    });

    const currentDate = new Date();
    const todayDate = new Date(
      Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    );
    const isoDate = todayDate.toISOString();
    const usageRes = await metricsApi.get(`metrics/usage?start=${isoDate}`);

    dispatch({
      type: MetricsActionsTypes.USAGE_METRICS_RECEIVED,
      payload: {
        metrics: usageRes.data,
        activePricingPlan,
      },
    });

    if (activePricingPlan?.type !== planTypes.ENTERPRISE.type) {
      dispatch(setMetricsStatus());
    }
  } catch (error) {
    console.log(error);
  }
};

export const setMetricsStatus = () => (dispatch: any, getState: any) => {
  try {
    const { metrics } = getState();
    const isOverLimitData = getMetricsLimitData(metrics?.metrics);
    dispatch({
      type: MetricsActionsTypes.SET_METRICS_LIMIT_STATUS,
      payload: isOverLimitData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMetricsLimitData = (metrics: Metrics) => {
  const { metricsAccount, metricsMonthly } = metrics;
  const sortedPercentages = Object.values({
    ...metricsAccount,
    ...metricsMonthly,
  }).sort((a, b) => a.percentage - b.percentage);

  const highestPct = sortedPercentages.pop();

  if (highestPct) {
    if (highestPct.title !== "Total Gateways" || highestPct.percentage > 100) {
      return getBannerTypeByPercentage(highestPct.percentage);
    } else {
      const nextHighestPct = sortedPercentages.pop();
      return getBannerTypeByPercentage(nextHighestPct?.percentage || 0);
    }
  }
  return metricLimitInfo.PLAN_OK;
};

const getBannerTypeByPercentage = (maxMetricPercentage: number) => {
  let bannerType = metricLimitInfo.PLAN_OK;

  if (maxMetricPercentage >= metricLimitInfo.PLAN_ABOVE_80.value) {
    bannerType = metricLimitInfo.PLAN_ABOVE_80;
  }
  if (maxMetricPercentage >= metricLimitInfo.PLAN_ABOVE_90.value) {
    bannerType = metricLimitInfo.PLAN_ABOVE_90;
  }
  if (maxMetricPercentage >= metricLimitInfo.PLAN_ABOVE_100.value) {
    bannerType = metricLimitInfo.PLAN_ABOVE_100;
  }
  if (maxMetricPercentage >= metricLimitInfo.PLAN_ABOVE_110.value) {
    bannerType = metricLimitInfo.PLAN_ABOVE_110;
  }
  if (maxMetricPercentage >= metricLimitInfo.PLAN_ABOVE_120.value) {
    bannerType = metricLimitInfo.PLAN_ABOVE_120;
  }
  if (maxMetricPercentage >= metricLimitInfo.PLAN_ABOVE_125.value) {
    bannerType = metricLimitInfo.PLAN_ABOVE_125;
  }
  return bannerType;
};
