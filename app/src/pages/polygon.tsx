import DefaultLayout from "@/components/DefaultLayout";
import PolygonHero from "@/components/hero/PoygonHero";
import StatsBase from "@/components/StatsBase";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Polygon Student Faucet"
        description="Unofficial student-only Polygon Student Faucet."
        openGraph={{ images: [{ url: "https://www.as-faucet.xyz/ssf.png" }] }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <DefaultLayout type="polygon" theme={["cyberpunk", "night"]}>
        <PolygonHero />
        {/* <h1 className="text-center text-6xl font-bold text-red-500 sm:mt-32">
          Under Maintenance
        </h1> */}
        <div className="mx-2 flex justify-center">
          <StatsBase type="polygon" symbol="MATIC" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
