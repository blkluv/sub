import { LOAD_GATEWAYS } from "./types";
import { setAlert } from "../../slices/alertSlice";
import { getErrorMessage } from "../../../helpers/getErrorMessage";
import { managedApi } from "../fakeAxios";
import { AlertType } from "../../../components/Alert";

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
        dispatch(setAlert({ message: "Gateway created!", type: AlertType.Info }));
        dispatch(getAllGateways(1));
      }
      return res?.data;
    } catch (error) {
      console.log(error);
      const message = getErrorMessage(error);
      dispatch(setAlert({ message, type: AlertType.Error }));
    }
  };
