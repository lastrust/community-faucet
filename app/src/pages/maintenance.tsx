import DefaultLayout from "@/components/DefaultLayout";
import { useContract } from "@/hooks";
import { ethers } from "ethers";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const contract = useContract("polygon");
  const click = () =>
    void contract?.changeDropSize(ethers.utils.parseEther("0.008"));
  return (
    <>
      <DefaultLayout type="astar" theme={["cupcake", "dracula"]}>
        <button className="btn" onClick={click}>
          BTN
        </button>
      </DefaultLayout>
    </>
  );
};

export default Home;
