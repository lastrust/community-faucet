import { Web3Provider } from "@/components/Web3Provider";
import "@/styles/global.css";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      void persistQueryClient({
        queryClient,
        persistor: createWebStoragePersistor({
          storage: window.localStorage,
        }),
      });
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA}
        language="ja"
      >
        <Web3Provider>
          <NextSeo
            title="Student Faucet"
            description="Unofficial student-only Student Faucet."
            openGraph={{
              images: [{ url: "https://www.as-faucet.xyz/sf.png" }],
            }}
            twitter={{
              cardType: "summary_large_image",
            }}
          />
          <Component {...pageProps} />
        </Web3Provider>
      </GoogleReCaptchaProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
