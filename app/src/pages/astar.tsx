import DefaultLayout from "@/components/DefaultLayout";
import AstarHero from "@/components/hero/AstarHero";
import StatsBase from "@/components/StatsBase";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout theme={["cupcake", "dracula"]}>
      <AstarHero />
      <div className="mx-2 flex justify-center">
        <StatsBase type="astar" symbol="ASTR" />
      </div>
    </DefaultLayout>
  );
};

export default Home;
