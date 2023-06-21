import Layout from "@/components/layout/layout";
import { AppProps } from "next/app";
import "../styles.css";
import { Provider } from "react-redux";
import appStore from "@/lib/store/app.store";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={appStore}>
      <Layout>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  );
}
