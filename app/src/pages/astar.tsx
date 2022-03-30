import DefaultLayout from "@/components/DefaultLayout";
import AstarHero from "@/components/hero/AstarHero";
import StatsBase from "@/components/StatsBase";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="AStar Student Faucet"
        description="Unofficial student-only Astar Student Faucet."
        openGraph={{ images: [{ url: "https://www.as-faucet.xyz/ogp.png" }] }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <DefaultLayout theme={["cupcake", "dracula"]}>
        <AstarHero />
        <div className="mx-2 flex justify-center">
          <StatsBase type="astar" symbol="ASTR" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
