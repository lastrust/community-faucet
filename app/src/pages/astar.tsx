import DefaultLayout from "@/components/DefaultLayout";
import StatsBase from "@/components/StatsBase";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="AStar Community Faucet"
        description="Unofficial Astar Community Faucet."
        openGraph={{ images: [{ url: "https://www.as-faucet.xyz/ogp.png" }] }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <DefaultLayout type="astar" theme={["cupcake", "dracula"]}>
        {/* <AstarHero /> */}
        <h1 className="text-center text-6xl font-bold text-red-500 sm:mt-32">
          Under Maintenance
        </h1>{" "}
        <div className="mx-2 flex justify-center">
          <StatsBase type="astar" symbol="ASTR" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
