export async function rudderInitialize() {
  window.rudderanalytics = await import("rudder-sdk-js");

  rudderanalytics.load(
    process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY,
    process.env.NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL,
    {
      integrations: { All: true }, // load call options
    }
  );

  rudderanalytics.ready(() => {
    // console.log("All set!");
  });
}
