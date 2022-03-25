import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Stats />
    </>
  );
};

export default Home;
