import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { Auth } from "@src/components/auth";
import { Chat } from "@src/containers/chat";
import { store } from "@src/redux/store";

import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Auth />
      <Chat />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Provider>
  );
}

export default MyApp;
