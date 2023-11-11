import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@src/redux/store";

import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />

      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
