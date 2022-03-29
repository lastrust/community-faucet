import { Web3Provider } from "@/components/Web3Provider";
import "@/styles/global.css";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA}
      language="ja"
    >
      <Web3Provider>
        <NextSeo
          title="AStar Student Faucet"
          description="Unofficial student-only AStar Student Faucet."
          openGraph={{ images: [{ url: "https://www.as-faucet.xyz/ogp.png" }] }}
          twitter={{
            cardType: "summary_large_image",
          }}
        />
        <Component {...pageProps} />
      </Web3Provider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
