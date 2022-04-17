import ChainInfo from "@/components/ChainInfo";
import DefaultLayout from "@/components/DefaultLayout";
import Info from "@/components/Info";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout type="astar">
      {/* <div className="hero hero-content mx-auto max-w-lg flex-col text-center sm:mt-32">
        <h1 className="text-5xl font-bold">Community Faucet</h1>
        <p className="text-lg">Powerful Faucet for Beginners</p>
      </div> */}
      <div className="flex h-full items-center justify-center sm:mt-32">
        <h1 className="text-6xl font-bold text-red-400">Under Maintenance</h1>
      </div>
      <div className="mx-auto grid max-w-2xl overflow-hidden shadow-lg sm:grid-cols-2 sm:rounded-lg">
        <ChainInfo type="astar" symbol="ASTR" href="/astar" theme="light" w={1}>
          AStar Community Faucet
        </ChainInfo>
        <ChainInfo
          type="shibuya"
          symbol="SBY"
          href="/shibuya"
          theme="lemonade"
          w={1}
        >
          Shibuya Community Faucet
        </ChainInfo>
        <ChainInfo
          type="polygon"
          symbol="MATIC"
          href="/polygon"
          theme="cyberpunk"
        >
          MATIC Community Faucet
        </ChainInfo>
        <ChainInfo type="shiden" symbol="SDN" href="/shiden" theme="dark">
          Shiden Community Faucet
        </ChainInfo>
      </div>
      <Info />
    </DefaultLayout>
  );
};

export default Home;
