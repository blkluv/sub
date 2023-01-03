export enum MetricsActionsTypes {
  USAGE_STATUS_RECEIVED = "USAGE_STATUS_RECEIVED",
  USAGE_METRICS_RECEIVED = "USAGE_METRICS_RECEIVED",
  SET_METRICS_LIMIT_STATUS = "SET_METRICS_LIMIT_STATUS",
}

export interface UsageStatus {
  fileCount: number;
  fileCountPct: number;
  gatewayCount: number;
  gatewayCountPct: number;
  planAnchorDate: string;
  planId: string;
  storageSize: number;
  storageSizePct: number;
  storedMinutes: number;
  storedMinutesPct: number;
  userId: string;
  fileCountLimit: number;
  gatewayCountLimit: number;
  planState: "PLAN_OK" | string;
  storageSizeLimit: number;
  storedMinutesLimit: number;
}

export interface UsageMetrics {
  end: string;
  imageResizeRequests: number;
  imageResizeRequestsPct: number;
  imgReqCountLimit: number;
  reqCount: number;
  reqCountPct: number;
  shortLinkCount: number;
  shortLinkCountPct: number;
  start: string;
  streamedMinutes: number;
  streamedMinutesPct: number;
  transferBytes: number;
  transferBytesPct: number;
  userId: string;
  planState: "PLAN_OK" | string;
  reqCountLimit: number;
  shortLinkCountLimit: number;
  streamedMinutesLimit: number;
  transferBytesLimit: number;
}

export interface SingleMetric {
  value: number;
  title: string;
  limit: number;
  limitUnit?: string;
  percentage: number;
}

export type MetricLimitData = {
  title: string;
  color: string;
  type: string | any;
  text: string;
  value: null | number;
};

export type Metrics = {
  metricsAccount: {
    storageSize: SingleMetric;
    gatewayCount: SingleMetric;
    fileCount: SingleMetric;
    storedMinutes: SingleMetric;
  };
  metricsMonthly: {
    transferBytes: SingleMetric;
    imageResizeRequests: SingleMetric;
    streamedMinutes: SingleMetric;
    shortLinkCount: SingleMetric;
    reqCount: SingleMetric;
  };
};

export interface MetricsState {
  metricsLimitData: MetricLimitData;
  metrics: Metrics;
  lastUpdated: number;
}
