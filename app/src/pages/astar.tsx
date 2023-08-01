import DefaultLayout from "@/components/DefaultLayout";
import AstarHero from "@/components/hero/AstarHero";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";

const StatsBase = dynamic(() => import("@/components/StatsBase"), {
  ssr: false,
});

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
        <AstarHero />
        <div className="mx-2 flex justify-center">
          <StatsBase type="astar" symbol="ASTR" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
