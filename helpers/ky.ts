import ky from "ky";
import { KyInstance } from "ky/distribution/types/ky";

let kyObj: KyInstance;
export const getKy = (): KyInstance => {
  if (kyObj) {
    return kyObj;
  }
  kyObj = ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set("Content-Type", "application/json");
        },
      ],
    },
  });
  return kyObj;
};

export let jwt;
export const setCredentials = (_jwt: string) => {
  jwt = _jwt;
  kyObj = ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set("Authorization", `Bearer ${_jwt}`);
          request.headers.set("source", "login");
        },
      ],
    },
  });
};

export const removeCredentials = () => {
  kyObj = ky.extend({});
};
