import { metricLimitInfo } from "../../../constants/planTypes";
import {
  MetricsActionsTypes,
  UsageMetrics,
  UsageStatus,
  MetricLimitData,
  MetricsState,
} from "./types";

const initialState: MetricsState = {
  metricsLimitData: metricLimitInfo.PLAN_OK,
  metrics: {
    metricsAccount: {
      storageSize: {
        value: 0,
        title: "Total size of pinned items",
        limit: 0,
        percentage: 0,
        limitUnit: "GB",
      },
      gatewayCount: {
        value: 0,
        title: "Total Gateways",
        limit: 0,
        percentage: 0,
      },
      fileCount: {
        value: 0,
        title: "Number of items pinned",
        limit: 0,
        percentage: 0,
      },
      storedMinutes: {
        value: 0,
        title: "Minutes of Video Stored",
        limit: 0,
        percentage: 0,
      },
    },
    metricsMonthly: {
      transferBytes: {
        value: 0,
        title: "Gateway Bandwidth Used",
        limit: 0,
        limitUnit: "GB",
        percentage: 0,
      },
      imageResizeRequests: {
        value: 0,
        title: "Number of Images Optimized",
        limit: 0,
        percentage: 0,
      },
      shortLinkCount: {
        value: 0,
        title: "Number of Shortened Links Created",
        limit: 0,
        percentage: 0,
      },
      streamedMinutes: {
        value: 0,
        title: "Minutes of Video Streamed",
        limit: 0,
        percentage: 0,
      },
      reqCount: {
        value: 0,
        title: "Total Requests",
        limit: 0,
        percentage: 0,
      },
      // customDomains: {
      //   value: 0,
      //   title: '',
      //   limit: 0,
      //   percentage: 0
      // }
    },
  },
  lastUpdated: Date.now(),
};

type MetricsAction = {
  type: MetricsActionsTypes.USAGE_STATUS_RECEIVED | MetricsActionsTypes.USAGE_METRICS_RECEIVED;
  payload: {
    metrics: UsageStatus & UsageMetrics;
  };
};

type MetricLimitDataAction = {
  type: MetricsActionsTypes.SET_METRICS_LIMIT_STATUS;
  payload: MetricLimitData;
};

const reducer = function (
  state: MetricsState = initialState,
  action: MetricsAction | MetricLimitDataAction
) {
  const { type, payload } = action;
  switch (type) {
    case MetricsActionsTypes.USAGE_STATUS_RECEIVED:
      return {
        ...state,
        lastUpdated: Date.now(),
        metrics: {
          ...state.metrics,
          metricsAccount: {
            ...state.metrics.metricsAccount,
            storageSize: {
              // STATIC
              ...state.metrics.metricsAccount.storageSize,
              value: payload.metrics.storageSize,
              limit: payload.metrics.storageSizeLimit / 1000000000,
              percentage: parseInt(
                (payload.metrics.storageSizePct * 100).toFixed(
                  payload.metrics.storageSizePct === 0 ? 0 : 2
                )
              ),
            },
            gatewayCount: {
              // STATIC
              ...state.metrics.metricsAccount.gatewayCount,
              value: payload.metrics.gatewayCount,
              limit: payload.metrics.gatewayCountLimit,
              percentage: parseInt(
                (payload.metrics.gatewayCountPct * 100).toFixed(
                  payload.metrics.gatewayCountPct === 0 ? 0 : 2
                )
              ),
            },
            fileCount: {
              // STATIC
              ...state.metrics.metricsAccount.fileCount,
              value: payload.metrics.fileCount,
              limit: payload.metrics.fileCountLimit,
              percentage: parseInt(
                (payload.metrics.fileCountPct * 100).toFixed(
                  payload.metrics.fileCountPct === 0 ? 0 : 2
                )
              ),
            },
            storedMinutes: {
              // STATIC
              ...state.metrics.metricsAccount.storedMinutes,
              value: parseFloat(payload.metrics.storedMinutes.toFixed(2)),
              limit: payload.metrics.storedMinutesLimit,
              percentage: parseInt(
                (payload.metrics.storedMinutesPct * 100).toFixed(
                  payload.metrics.storedMinutesPct === 0 ? 0 : 2
                )
              ),
            },
          },
        },
      };
    case MetricsActionsTypes.USAGE_METRICS_RECEIVED:
      return {
        ...state,
        lastUpdated: Date.now(),
        metrics: {
          ...state.metrics,
          metricsMonthly: {
            ...state.metrics.metricsMonthly,
            transferBytes: {
              // DYNAMIC Month to Month
              ...state.metrics.metricsMonthly.transferBytes,
              value: payload.metrics.transferBytes,
              limit: payload.metrics.transferBytesLimit / 1000000000,
              percentage: parseInt(
                (payload.metrics.transferBytesPct * 100).toFixed(
                  payload.metrics.transferBytesPct === 0 ? 0 : 2
                )
              ),
            },
            imageResizeRequests: {
              // DYNAMIC Month to Month
              ...state.metrics.metricsMonthly.imageResizeRequests,
              value: payload.metrics.imageResizeRequests,
              limit: payload.metrics.imgReqCountLimit,
              percentage: parseInt(
                (payload.metrics.imageResizeRequestsPct * 100).toFixed(
                  payload.metrics.imageResizeRequestsPct === 0 ? 0 : 2
                )
              ),
            },
            streamedMinutes: {
              // DYNAMIC Month to Month
              ...state.metrics.metricsMonthly.streamedMinutes,
              value: parseFloat(payload.metrics.streamedMinutes.toFixed(2)),
              limit: payload.metrics.streamedMinutesLimit,
              percentage: parseInt(
                (payload.metrics.streamedMinutesPct * 100).toFixed(
                  payload.metrics.streamedMinutesPct === 0 ? 0 : 2
                )
              ),
            },
            shortLinkCount: {
              // DYNAMIC Month to Month
              ...state.metrics.metricsMonthly.shortLinkCount,
              value: payload.metrics.shortLinkCount,
              limit: payload.metrics.shortLinkCountLimit,
              percentage: parseInt(
                (payload.metrics.shortLinkCountPct * 100).toFixed(
                  payload.metrics.shortLinkCountPct === 0 ? 0 : 2
                )
              ),
            },
            reqCount: {
              // DYNAMIC Month to Month
              ...state.metrics.metricsMonthly.reqCount,
              value: payload.metrics.reqCount,
              limit: payload.metrics.reqCountLimit,
              percentage: parseInt(
                (payload.metrics.reqCountPct * 100).toFixed(
                  payload.metrics.reqCountPct === 0 ? 0 : 2
                )
              ),
            },
          },
        },
      };
    case MetricsActionsTypes.SET_METRICS_LIMIT_STATUS:
      return {
        ...state,
        metricsLimitData: payload,
      };
    default:
      return state;
  }
};
export default reducer;
