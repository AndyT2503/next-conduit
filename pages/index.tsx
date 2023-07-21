import NewsFeed from "@/components/home/news-feed";
import Head from "next/head";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Next Conduit</title>
      </Head>
      <NewsFeed />
    </div>
  );
}
