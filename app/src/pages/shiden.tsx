import DefaultLayout from "@/components/DefaultLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout
      title={["Shiden Student Faucet", "SSFaucet"]}
      theme={["retro", "night"]}
    >
      <div className="hero hero-content mx-auto max-w-xl flex-col text-center sm:mt-32">
        <h2 className="text-5xl font-bold">Coming Soon....</h2>
      </div>
    </DefaultLayout>
  );
};

export default Home;
