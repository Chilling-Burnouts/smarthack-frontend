import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { Auth } from "@src/components/auth";
import { store } from "@src/redux/store";

import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Auth />
      <ToastContainer position="bottom-right" />
    </Provider>
  );
}

export default MyApp;
