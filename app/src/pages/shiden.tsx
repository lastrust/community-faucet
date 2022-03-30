import DefaultLayout from "@/components/DefaultLayout";
import ShidenHero from "@/components/hero/ShidenHero";
import StatsBase from "@/components/StatsBase";
import { useContract } from "@/hooks";
import type { NextPage } from "next";

const Home: NextPage = () => {
  useContract("shiden", {
    fetchOnly: true,
    cb: async (contract) => {
      console.log(await contract.tokenURI(1));
    },
  });
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
