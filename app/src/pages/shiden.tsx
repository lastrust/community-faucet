import DefaultLayout from "@/components/DefaultLayout";
import ShidenHero from "@/components/hero/ShidenHero";
import StatsBase from "@/components/StatsBase";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Shiden Community Faucet"
        description="Unofficial Shiden Community Faucet."
        openGraph={{ images: [{ url: "https://www.as-faucet.xyz/ogp.png" }] }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <DefaultLayout type="shiden" theme={["lofi", "night"]}>
        {/* <h1 className="text-center text-6xl font-bold text-red-500 sm:mt-32">
          Under Maintenance
        </h1>{" "} */}

        <ShidenHero />

        <div className="mx-2 flex justify-center">
          <StatsBase type="shiden" symbol="SDN" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
