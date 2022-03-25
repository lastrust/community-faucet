import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import { useContract } from "@/hooks";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  const contract = useContract({});
  useEffect(() => {
    if (contract) {
      contract
        .supportData(0)
        .then((e) => console.log(e))
        .catch((e) => console.error(e));
    }
  }, [contract]);
  return (
    <>
      <Hero />
      <Stats />
    </>
  );
};

export default Home;
