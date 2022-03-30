import DefaultLayout from "@/components/DefaultLayout";
import ShidenHero from "@/components/hero/ShidenHero";
import StatsBase from "@/components/StatsBase";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Shiden Student Faucet"
        description="Unofficial student-only Shiden Student Faucet."
        openGraph={{ images: [{ url: "https://www.as-faucet.xyz/ssf.png" }] }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <DefaultLayout theme={["lofi", "night"]}>
        <ShidenHero />
        <div className="mx-2 flex justify-center">
          <StatsBase type="shiden" symbol="SDN" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
