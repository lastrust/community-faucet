import DefaultLayout from "@/components/DefaultLayout";
import { Web3Provider } from "@/components/Web3Provider";
import "@/styles/global.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Web3Provider>
  );
}

export default MyApp;
