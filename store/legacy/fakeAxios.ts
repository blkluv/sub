import { getKy, jwt } from "../../helpers/ky";
import ky from "ky";

const buildApi = (baseUrl: string) => {
  return {
    get: async (url: string, params?: any) => {
      const ky = getKy();
      const response = await ky.get(baseUrl + "/" + url, { searchParams: params });
      const res = await response.json();
      return { data: res };
    },
    post: async (url: string, data?: any) => {
      const ky = getKy();
      const response = await ky.post(baseUrl + "/" + url, { json: data });
      const res = await response.json();
      return { data: res };
    },
    put: async (url: string, data?: any) => {
      const ky = getKy();
      const response = await ky.put(baseUrl + "/" + url, { json: data });
      const res = await response.json();
      return { data: res };
    },
    delete: async (url: string, data?: any) => {
      const ky = getKy();
      const response = await ky.delete(baseUrl + "/" + url, { json: data });
      const res = await response.json();
      return { data: res };
    },
  };
};
export const api = buildApi(process.env.NEXT_PUBLIC_PINATA_API_URL || "");
export const managedApi = buildApi(process.env.NEXT_PUBLIC_MANAGED_API || "");

// metricsApi does not have "Bearer" in the Authorization header...
export const metricsApi = {
  get: async (url: string, params?: any) => {
    const response = await ky.get(process.env.NEXT_PUBLIC_METRICS_API + "/" + url, {
      searchParams: params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    });
    const res = await response.json();
    return { data: res };
  },
};
