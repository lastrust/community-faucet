import { supportedChains } from "@/config";
import "@/styles/global.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

if (!process.env.NEXT_PUBLIC_INFURA_PROJECT_ID)
  throw new Error("ALCHEMY_ID is not set in .env");
if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID)
  throw new Error("WALLETCONNECT_PROJECT_ID is not set in .env");

const { chains, publicClient } = configureChains(supportedChains, [
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Community Faucet",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA || ""}
      language="ja"
    >
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <NextSeo
            title="Community Faucet"
            description="Unofficial Community Faucet."
            openGraph={{
              images: [{ url: "https://www.as-faucet.xyz/sf.png" }],
            }}
            twitter={{
              cardType: "summary_large_image",
            }}
          />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
