import * as rudderanalytics from "rudder-sdk-js";
rudderanalytics.load(
  process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY,
  process.env.NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL
);
rudderanalytics.ready(() => {
  // console.log("We are all set!!!");
});
export { rudderanalytics };
