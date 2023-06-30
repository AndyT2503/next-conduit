import Layout from "@/components/layout/layout";
import appStore from "@/lib/store/app.store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={appStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
