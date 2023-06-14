import Layout from "@/components/layout/layout";
import { AppProps } from "next/app";
import '../styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
