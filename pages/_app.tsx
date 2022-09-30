import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { IntercomProvider } from "react-use-intercom";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || "f4cld255";
const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <IntercomProvider appId={INTERCOM_APP_ID}>
        <Component {...props.pageProps} />
      </IntercomProvider>
    </Provider>
  );
};

export default MyApp;
