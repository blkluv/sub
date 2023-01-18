export interface GatewayRow {
  id: string;
  createdAt: string;
  customDomains: any[];
  domain: string;
  restrict: boolean;
  gatewaySettings: {
    allowedIPAddresses: Array<{ value: string; createdAt: string; id: string }>;
    allowedHosts: Array<{ value: string; createdAt: string; id: string }>;
    accessTokens: Array<{ value: string; createdAt: string; id: string }>;
  };
}

export interface Gateways {
  count: number;
  rows: GatewayRow[];
}

export interface GatewaysState {
  bandwidth: number;
  gatewayRegions: any[];
  gatewayUsage: any;
  gateways: Gateways;
}

// ACCESS SETTINGS
export const GATEWAYS_SETTINGS_TOKEN_ADDED = "GATEWAYS_SETTINGS_TOKEN_ADDED";
export const GATEWAYS_SETTINGS_TOKEN_REMOVED = "GATEWAYS_SETTINGS_TOKEN_REMOVED";
export const GATEWAYS_SETTINGS_IP_ADDED = "GATEWAYS_SETTINGS_IP_ADDED";
export const GATEWAYS_SETTINGS_IP_REMOVED = "GATEWAYS_SETTINGS_IP_REMOVED";
export const GATEWAYS_SETTINGS_HOST_ADDED = "GATEWAYS_SETTINGS_HOST_ADDED";
export const GATEWAYS_SETTINGS_HOST_REMOVED = "GATEWAYS_SETTINGS_HOST_REMOVED";
export const GATEWAYS_SETTINGS_DETAILS_RETRIEVED = "GATEWAYS_SETTINGS_DETAILS_RETRIEVED";

//Gateways
export const LOAD_GATEWAYS = "LOAD_GATEWAYS";
export const GATEWAY_REGIONS = "GATEWAY_REGIONS";
export const GATEWAY_USAGE = "GATEWAY_USAGE";
export const TOTAL_BANDWIDTH_MONTH = "TOTAL_BANDWIDTH_MONTH";
