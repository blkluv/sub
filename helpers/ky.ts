import ky from "ky";
import { KyInstance } from "ky/distribution/types/ky";

let kyObj: KyInstance;
export const getKy = (): KyInstance => {
  if (kyObj) {
    return kyObj;
  }
  kyObj = ky;
  return kyObj;
};

export const setCredentials = (jwt: string) => {
  kyObj = ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set("Authorization", `Bearer ${jwt}`);
          request.headers.set("source", "login");
        },
      ],
    },
  });
};

export const removeCredentials = () => {
  kyObj = ky.extend({});
};
