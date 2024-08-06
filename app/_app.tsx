// pages/_app.tsx
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import RootLayout from "./layout";
import StoreProvider from "@/app/store/StoreProvider";
import store from "./store/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Provider>
  );
}

export default MyApp;
