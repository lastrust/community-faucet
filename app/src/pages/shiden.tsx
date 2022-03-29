import DefaultLayout from "@/components/DefaultLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout
      title={["Shiden Student Faucet", "SSFaucet"]}
      theme={["retro", "night"]}
    >
      <div className="hero hero-content max-w-xl">
        <h2 className="text-4xl font-bold">Coming Soon....</h2>
      </div>
    </DefaultLayout>
  );
};

export default Home;
