import { GATEWAYS_SETTINGS_HOST_ADDED, GATEWAYS_SETTINGS_HOST_REMOVED } from "./types";
import {
  LOAD_GATEWAYS,
  GATEWAY_REGIONS,
  GATEWAY_USAGE,
  TOTAL_BANDWIDTH_MONTH,
  GATEWAYS_SETTINGS_TOKEN_ADDED,
  GATEWAYS_SETTINGS_TOKEN_REMOVED,
  GATEWAYS_SETTINGS_IP_ADDED,
  GATEWAYS_SETTINGS_IP_REMOVED,
  GATEWAYS_SETTINGS_DETAILS_RETRIEVED,
} from "./types";
import { GatewaysState } from "./types";

const initialState: GatewaysState = {
  gateways: { count: 0, rows: [] },
  gatewayRegions: [],
  gatewayUsage: null,
  bandwidth: 0,
};

const reducer = function (state: GatewaysState = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_GATEWAYS:
      return {
        ...state,
        gateways: payload,
      };
    case GATEWAY_REGIONS:
      return {
        ...state,
        gatewayRegions: payload,
      };
    case GATEWAY_USAGE:
      return {
        ...state,
        gatewayUsage: payload,
      };
    case TOTAL_BANDWIDTH_MONTH:
      return {
        ...state,
        bandwidth: payload,
      };
    case GATEWAYS_SETTINGS_DETAILS_RETRIEVED: {
      return {
        ...state,
        gateways: {
          ...state.gateways,
          rows: [
            ...state.gateways.rows.map((el) => {
              if (el.id === payload.gatewayId) {
                el.gatewaySettings = payload.settings;
              }
              return el;
            }),
          ],
        },
      };
    }
    case GATEWAYS_SETTINGS_TOKEN_ADDED:
      return {
        ...state,
        gateways: {
          ...state.gateways,
          rows: [
            ...state.gateways.rows.map((el) => {
              if (el.id === payload.gatewayId) {
                el.gatewaySettings.accessTokens.push(payload.token);
              }
              return el;
            }),
          ],
        },
      };
    case GATEWAYS_SETTINGS_TOKEN_REMOVED:
      return {
        ...state,
        gateways: {
          ...state.gateways,
          rows: [
            ...state.gateways.rows.map((el) => {
              if (el.id === payload.gatewayId) {
                el = {
                  ...el,
                  gatewaySettings: {
                    ...el.gatewaySettings,
                    accessTokens: el.gatewaySettings.accessTokens.filter(
                      (token: { value: string; id: string; createdAt: string }) =>
                        token.id !== payload.tokenId
                    ),
                  },
                };
              }
              return el;
            }),
          ],
        },
      };
    case GATEWAYS_SETTINGS_IP_ADDED:
      return {
        ...state,
        gateways: {
          ...state.gateways,
          rows: [
            ...state.gateways.rows.map((el) => {
              if (el.id === payload.gatewayId) {
                el.gatewaySettings.allowedIPAddresses.push(payload.ip);
              }
              return el;
            }),
          ],
        },
      };
    case GATEWAYS_SETTINGS_IP_REMOVED:
      return {
        ...state,
        gateways: {
          ...state.gateways,
          rows: [
            ...state.gateways.rows.map((el) => {
              if (el.id === payload.gatewayId) {
                el = {
                  ...el,
                  gatewaySettings: {
                    ...el.gatewaySettings,
                    allowedIPAddresses: el.gatewaySettings.allowedIPAddresses.filter(
                      (ip: { value: string; id: string; createdAt: string }) =>
                        ip.id !== payload.ipAddressId
                    ),
                  },
                };
              }
              return el;
            }),
          ],
        },
      };
    case GATEWAYS_SETTINGS_HOST_ADDED:
      return {
        ...state,
        gateways: {
          ...state.gateways,
          rows: [
            ...state.gateways.rows.map((el) => {
              if (el.id === payload.gatewayId) {
                el.gatewaySettings.allowedHosts.push(payload.host);
              }
              return el;
            }),
          ],
        },
      };
    case GATEWAYS_SETTINGS_HOST_REMOVED:
      return {
        ...state,
        gateways: {
          ...state.gateways,
          rows: [
            ...state.gateways.rows.map((el) => {
              if (el.id === payload.gatewayId) {
                el = {
                  ...el,
                  gatewaySettings: {
                    ...el.gatewaySettings,
                    allowedHosts: el.gatewaySettings.allowedHosts.filter(
                      (host: { value: string; id: string; createdAt: string }) =>
                        host.id !== payload.hostId
                    ),
                  },
                };
              }
              return el;
            }),
          ],
        },
      };
    default:
      return state;
  }
};

export default reducer;
