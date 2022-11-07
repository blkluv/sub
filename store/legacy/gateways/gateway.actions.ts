import {
  LOAD_GATEWAYS,
  GATEWAY_USAGE,
  GATEWAYS_SETTINGS_TOKEN_ADDED,
  GATEWAYS_SETTINGS_TOKEN_REMOVED,
  GATEWAYS_SETTINGS_IP_ADDED,
  GATEWAYS_SETTINGS_IP_REMOVED,
  GATEWAYS_SETTINGS_HOST_ADDED,
  GATEWAYS_SETTINGS_HOST_REMOVED,
  GATEWAYS_SETTINGS_DETAILS_RETRIEVED,
} from "./types";
import type { GatewayRow } from "./types";
import { setAlert } from "../../slices/alertSlice";
import { getErrorMessage } from "../../../helpers/getErrorMessage";
import { api, managedApi, metricsApi } from "../fakeAxios";

export const getAllGateways = (page: number) => async (dispatch: any, getState: any) => {
  try {
    const currentState = getState();
    const res = await managedApi.get(`gateways?page=${page}`);
    if (res && res?.data) {
      dispatch({
        type: LOAD_GATEWAYS,
        payload: {
          count: res.data.items.count,
          rows: res.data.items.rows,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createGateway =
  (gatewayInfo: { subdomain: string; restricted?: boolean }, update?: boolean) =>
  async (dispatch: any) => {
    try {
      const body = {
        domain: gatewayInfo.subdomain.toLowerCase(),
        restrict: true,
      };
      const res = await managedApi.post(`gateways`, body);
      if (!update && res?.data) {
        dispatch(setAlert({ message: "Gateway created!", type: "success" }));
        dispatch(getAllGateways(1));
      }
      return res?.data;
    } catch (error) {
      console.log(error);
      const message = getErrorMessage(error);
      dispatch(setAlert({ message, type: "error" }));
    }
  };

// export const checkSubdomain = (subdomain: string) => async (dispatch: any) => {
//   try {
//     const res = await managedApi.get(`gateways/${subdomain.toLowerCase()}/exists`);
//     const isTaken = res?.data?.exists;
//     return isTaken;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createCustomDomain =
//   (gatewayId: string | number, domain: string) => async (dispatch: any) => {
//     try {
//       const body = {
//         domain,
//       };
//       const res = await managedApi.post(`gateways/${gatewayId}/custom_domain`, body);
//       dispatch(getAllGateways(1));
//       if (res) dispatch(setAlert({ message: "Added custom domain!", type: "success" }));
//       return res?.data;
//     } catch (error) {
//       console.log(error);
//       dispatch(
//         setAlert({ message: "Error was occured during custom domain creation!", type: "error" })
//       );
//       throw error;
//     }
//   };

// export const getCustomDomainDNSStatus =
//   (gatewayId: string | number, customDomainId: string) => async () => {
//     try {
//       return await managedApi.get(
//         `gateways/${gatewayId}/custom_domain/${customDomainId}?updateStatus=yes`
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const deleteGateway =
//   (gatewayId: string | number, update: boolean) => async (dispatch: any) => {
//     try {
//       const res = await managedApi.delete(`gateways/${gatewayId}`);
//       if (!update) {
//         dispatch(setAlert({ message: "Removed gateway", type: "success" }));
//         dispatch(getAllGateways(1));
//       }
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const checkUsage =
//   (domain: string, dateRange: { today: Date; past: Date }, gateways: any) =>
//   async (dispatch: any) => {
//     try {
//       const allStats: { domain: any; requests: any; bandwidth: any }[] = [];
//       const endDate = dateRange.today.toISOString();
//       const startDate = dateRange.past.toISOString();

//       const url = `metrics/gateways?start=${startDate}&end=${endDate}`;
//       const resBandwidth = await metricsApi.get(url);

//       gateways?.gateways?.rows?.forEach((gateway: any) => {
//         // Get current gateway
//         if (gateway?.domain.split(".")[0] === domain) {
//           // Get bandwidth usage for current gateway
//           const selectedBandwidth = resBandwidth?.data?.find(
//             (bandwidth: any) => bandwidth.domain.split(".")[0] === gateway.domain
//           );
//           if (selectedBandwidth) {
//             allStats.push({
//               domain: selectedBandwidth.domain,
//               requests: selectedBandwidth.reqCount,
//               bandwidth: selectedBandwidth.transferBytes,
//             });
//           }
//           // Get Custom Domain bandwidth usage of current gateway
//           if (gateway?.customDomains[0]) {
//             const selectedBandwidthCustomDomain = resBandwidth?.data?.find(
//               (bandwidth: any) => bandwidth.domain === gateway?.customDomains[0]?.domain
//             );
//             if (selectedBandwidthCustomDomain) {
//               allStats.push({
//                 domain: selectedBandwidthCustomDomain.domain,
//                 requests: selectedBandwidthCustomDomain.reqCount,
//                 bandwidth: selectedBandwidthCustomDomain.transferBytes,
//               });
//             }
//           }
//         }
//       });

//       if (allStats.length > 0) {
//         dispatch({
//           type: GATEWAY_USAGE,
//           payload: allStats,
//         });
//         return allStats;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const checkMonthlyBandwidth = async () => {
//   const currentDate = new Date();
//   let startDate: string | Date = new Date(
//     Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1)
//   );
//   let endDate: string | Date = new Date(
//     Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
//   );
//   startDate = startDate.toISOString();
//   endDate = endDate.toISOString();
//   const gatewayResults = await managedApi.get(
//     `organizations/billing?startDate=${startDate}&endDate=${endDate}`
//   );
//   let bandwidth = 0;
//   if (gatewayResults && gatewayResults.data) {
//     for (const gateway of gatewayResults.data.item.gateways) {
//       bandwidth = bandwidth + gateway.usage.bandwidth;
//     }
//   }

//   return bandwidth;
// };

// export const updateGateway =
//   (gatewayInfo: { subdomain: string; restricted: boolean; id: string }, page: number) =>
//   async (dispatch: any) => {
//     try {
//       const body = {
//         restrict: gatewayInfo.restricted,
//       };
//       await managedApi.put(`gateways/${gatewayInfo.id}`, body);
//       dispatch(getAllGateways(page));
//       dispatch(setAlert({ message: "Gateway updated!", type: "success" }));
//       return true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const deleteCustomDomain =
//   (gatewayId: string | number, customDomainId: string) => async (dispatch: any) => {
//     try {
//       await managedApi.delete(`gateways/${gatewayId}/custom_domain/${customDomainId}`);
//       dispatch(getAllGateways(1));
//       return true;
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const killGateways = (gateways: GatewayRow[]) => async (dispatch: any) => {
//   try {
//     for (const gateway of gateways) {
//       await managedApi.delete(`gateways/${gateway.id}`);
//     }
//     // all of this should be refactored on API to return deleted object, so we will work with store, not fetch all gateways everytime
//     dispatch(getAllGateways(1));
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const setRootContent = (gatewayId: string, pin: any) => async (dispatch: any) => {
//   try {
//     const setContentRes = await api.put(`v2/gateways/${gatewayId}/pin/${pin}`, null);
//     return setContentRes;
//   } catch (error) {
//     const message = getErrorMessage(error);
//     dispatch(setAlert({ message: message, type: "error" }));
//     throw error;
//   }
// };

// export const getRootContent = (gatewayId: string) => async (dispatch: any) => {
//   try {
//     const getContentRes = await api.put(`v2/gateways/${gatewayId}/pin`);
//     return getContentRes;
//   } catch (error) {
//     const message = getErrorMessage(error);
//     dispatch(setAlert({ message: message, type: "error" }));
//   }
// };

// export const getGatewayDetails = (gatewayId: string) => async (dispatch: any) => {
//   try {
//     const gatewaysDetails = await managedApi.get(`gateways/${gatewayId}`);
//     if (gatewaysDetails?.data?.item) {
//       dispatch({
//         type: GATEWAYS_SETTINGS_DETAILS_RETRIEVED,
//         payload: {
//           gatewayId,
//           settings: gatewaysDetails?.data?.item?.settings?.restrictionPolicies,
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     const message = getErrorMessage(error);
//     dispatch(setAlert({ message: message, type: "error" }));
//   }
// };

// export const createGatewaySettingsToken = (gatewayId: string) => async (dispatch: any) => {
//   try {
//     const createTokenRes = await managedApi.post(`gateways/${gatewayId}/access_tokens`);
//     if (createTokenRes?.data) {
//       dispatch({
//         type: GATEWAYS_SETTINGS_TOKEN_ADDED,
//         payload: {
//           gatewayId,
//           token: {
//             id: createTokenRes?.data?.id,
//             value: createTokenRes?.data?.value,
//             createdAt: createTokenRes?.data?.createdAt,
//           },
//         },
//       });
//       dispatch(setAlert({ message: "Token added successfully!", type: "success" }));
//     }
//   } catch (error) {
//     console.log(error);
//     const message = getErrorMessage(error);
//     dispatch(setAlert({ message: message, type: "error" }));
//   }
// };

// export const removeGatewaysSettingsToken =
//   (gatewayId: string, tokenId: string) => async (dispatch: any) => {
//     try {
//       await managedApi.delete(`gateways/${gatewayId}/access_tokens/${tokenId}`);
//       dispatch({
//         type: GATEWAYS_SETTINGS_TOKEN_REMOVED,
//         payload: {
//           gatewayId,
//           tokenId,
//         },
//       });
//       dispatch(setAlert({ message: "Token removed!", type: "success" }));
//     } catch (error) {
//       console.log(error);
//       const message = getErrorMessage(error);
//       dispatch(setAlert({ message: message, type: "error" }));
//     }
//   };

// export const createGatewaySettingsIp =
//   (gatewayId: string, ipAddressToAdd: string) => async (dispatch: any) => {
//     try {
//       const createIpRes = await managedApi.post(`gateways/${gatewayId}/ips`, {
//         ip: ipAddressToAdd,
//       });
//       if (createIpRes?.data) {
//         dispatch({
//           type: GATEWAYS_SETTINGS_IP_ADDED,
//           payload: {
//             gatewayId,
//             ip: {
//               id: createIpRes?.data?.id,
//               value: createIpRes?.data?.value,
//               createdAt: createIpRes?.data?.createdAt,
//             },
//           },
//         });
//         dispatch(setAlert({ message: "IP added successfully!", type: "success" }));
//       }
//     } catch (error) {
//       console.log(error);
//       const message = getErrorMessage(error);
//       dispatch(setAlert({ message: message, type: "error" }));
//     }
//   };

// export const removeGatewaySettingsIp =
//   (gatewayId: string, ipAddressId: string) => async (dispatch: any) => {
//     try {
//       await managedApi.delete(`gateways/${gatewayId}/ips/${ipAddressId}`);
//       dispatch({
//         type: GATEWAYS_SETTINGS_IP_REMOVED,
//         payload: {
//           gatewayId,
//           ipAddressId,
//         },
//       });
//       dispatch(setAlert({ message: "IP removed successfully!", type: "success" }));
//     } catch (error) {
//       console.log(error);
//       const message = getErrorMessage(error);
//       dispatch(setAlert({ message: message, type: "error" }));
//     }
//   };

// export const createGatewaySettingsHost =
//   (gatewayId: string, hostToAdd: string) => async (dispatch: any) => {
//     try {
//       const createHostRes = await managedApi.post(`gateways/${gatewayId}/hosts`, {
//         host: hostToAdd,
//       });
//       if (createHostRes?.data) {
//         dispatch({
//           type: GATEWAYS_SETTINGS_HOST_ADDED,
//           payload: {
//             gatewayId,
//             host: {
//               id: createHostRes?.data?.id,
//               value: createHostRes?.data?.value,
//               createdAt: createHostRes?.data?.createdAt,
//             },
//           },
//         });
//         dispatch(setAlert({ message: "Host added successfully!", type: "success" }));
//       }
//     } catch (error) {
//       console.log(error);
//       const message = getErrorMessage(error);
//       dispatch(setAlert({ message: message, type: "error" }));
//     }
//   };

// export const removeGatewaySettingsHost =
//   (gatewayId: string, hostId: string) => async (dispatch: any) => {
//     try {
//       await managedApi.delete(`gateways/${gatewayId}/hosts/${hostId}`);
//       dispatch({
//         type: GATEWAYS_SETTINGS_HOST_REMOVED,
//         payload: {
//           gatewayId,
//           hostId,
//         },
//       });
//       dispatch(setAlert({ message: "Host removed successfully!", type: "success" }));
//     } catch (error) {
//       console.log(error);
//       const message = getErrorMessage(error);
//       dispatch(setAlert({ message: message, type: "error" }));
//     }
//   };
