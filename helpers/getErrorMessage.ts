export const getErrorMessage = (error) => {
  if (error && error.response && error.response.data && error.response.data.error) {
    if (typeof error.response.data.error === "string") {
      return error.response.data.error;
    } else if (typeof error.response.data.error === "object") {
      return error.response.data.error.details;
    }
    return "unknown error";
  }
  return error?.message ?? "unknown error";
};
