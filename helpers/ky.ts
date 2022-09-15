import ky from "ky";

let kyObj;
export const getKy = () => {
  if (kyObj) {
    return kyObj;
  }
  kyObj = ky;
};

export const setCredentials = (jwt: string) => {
  console.log("set");
  kyObj = ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set("Authorization", `Bearer ${jwt}`);
        },
      ],
    },
  });
};

export const removeCredentials = () => {
  kyObj = ky.extend({});
};
