import DefaultLayout from "@/components/DefaultLayout";
import ShidenHero from "@/components/hero/ShidenHero";
import StatsBase from "@/components/StatsBase";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout theme={["lofi", "night"]}>
      <ShidenHero />
      <div className="mx-2 flex justify-center">
        <StatsBase type="shiden" symbol="SDN" />
      </div>
    </DefaultLayout>
  );
};

export default Home;
