import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Stats from "@/components/Stats";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Info />
    </>
  );
};

export default Home;
