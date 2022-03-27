import DefaultLayout from "@/components/DefaultLayout";
import { Web3Provider } from "@/components/Web3Provider";
import "@/styles/global.css";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <DefaultLayout>
        <NextSeo
          title="AStar Student Faucet"
          description="Unofficial student-only AStar Student Faucet."
          openGraph={{ images: [{ url: "https://www.as-faucet.xyz/ogp.png" }] }}
          twitter={{
            cardType: "summary_large_image",
          }}
        />
        <Component {...pageProps} />
      </DefaultLayout>
    </Web3Provider>
  );
}

export default MyApp;
