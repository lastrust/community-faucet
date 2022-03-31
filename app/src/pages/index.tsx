import ChainInfo from "@/components/ChainInfo";
import DefaultLayout from "@/components/DefaultLayout";
import Info from "@/components/Info";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout type="astar">
      <div className="hero hero-content mx-auto max-w-lg flex-col text-center sm:mt-32">
        <h1 className="text-5xl font-bold">Student Faucet</h1>
        <p className="text-lg">Powerful Faucet for Students</p>
      </div>
      <div className="mx-auto grid max-w-2xl overflow-hidden shadow-lg sm:grid-cols-2 sm:rounded-lg">
        <ChainInfo type="astar" symbol="ASTR" href="/astar" theme="light" w={2}>
          AStar Student Faucet
        </ChainInfo>
        {/* <ChainInfo
          type="polygon"
          symbol="MATIC"
          href="/polygon"
          theme="cyberpunk"
        >
          MATIC Student Faucet
        </ChainInfo> */}
        <ChainInfo type="shiden" symbol="SDN" href="/shiden" theme="dark">
          Shiden Student Faucet
        </ChainInfo>
      </div>
      <Info />
    </DefaultLayout>
  );
};

export default Home;
