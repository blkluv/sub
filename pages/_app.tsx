import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import { FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "../store/store";
import ThemeProvider from "../theme/ThemeProvider";
import { useEffect } from "react";
import * as FullStory from "@fullstory/browser";
import { useRouter } from "next/router";
import { rudderInitialize } from "../rudderInitialize";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  useEffect(() => {
    FullStory.init(
      { orgId: process.env.NEXT_PUBLIC_FS_ORG_ID as string },
      ({ sessionUrl }) =>
        localStorage.getItem("debug") === "true" && console.log(`Started session: ${sessionUrl}`)
    );
  }, []);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      window.rudderanalytics && window.rudderanalytics.page();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    rudderInitialize().then(() => {
      window.rudderanalytics.page();
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;

export function reportWebVitals(metric) {
  localStorage.getItem("debug") === "true" && console.log(metric);
}
