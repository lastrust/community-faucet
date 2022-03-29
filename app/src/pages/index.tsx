import AstarHero from "@/components/astar/AstarHero";
import AstarStats from "@/components/astar/AstarStats";
import DefaultLayout from "@/components/DefaultLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout title={["AStar Student Faucet", "ASFaucet"]}>
      <AstarHero />
      <AstarStats />
    </DefaultLayout>
  );
};

export default Home;
