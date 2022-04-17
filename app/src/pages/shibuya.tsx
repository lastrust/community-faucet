import DefaultLayout from "@/components/DefaultLayout";
import StatsBase from "@/components/StatsBase";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Shibuya Community Faucet"
        description="Unofficial Shibuya Community Faucet."
        openGraph={{ images: [{ url: "https://www.as-faucet.xyz/ogp.png" }] }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <DefaultLayout type="shibuya" theme={["lemonade", "dracula"]}>
        <h1 className="text-center text-6xl font-bold text-red-500 sm:mt-32">
          Under Maintenance
        </h1>{" "}
        {/*
        <ShibuyaHero /> */}
        <div className="mx-2 flex justify-center">
          <StatsBase type="shibuya" symbol="SBY" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
