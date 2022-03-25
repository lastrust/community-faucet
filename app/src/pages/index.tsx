import { useContract } from "@/hooks/useContract";
import { useWeb3 } from "@/hooks/useWeb3";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const { account, isLoading, connectWallet, provider } = useWeb3();
  const [contractBalance, setContractBalance] = useState<string | null>(null);
  const contract = useContract(async (contract) => {
    if (provider) {
      setContractBalance(
        ethers.utils.formatEther(await provider.getBalance(contract.address))
      );
    }
  });

  return (
    <>
      <div className="hero hero-content mx-auto mt-32 flex-col text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">AStar Student Faucet</h1>
          <p className="py-6">
            This is Student-only Faucet more powerful than official Faucet. It
            is informal but run by students. And this Faucet is made possible by
            the support of volunteers. Therefore, it sometimes becomes
            unavailable.
          </p>
        </div>
        <div className="flex w-full max-w-2xl items-center gap-4">
          <div className="input-group w-full max-w-sm">
            <input
              type="text"
              placeholder="Type Your Address"
              className="input input-primary w-full"
            />
            <button className="btn btn-primary">Get</button>
          </div>
          <div className="text-xl font-bold">OR</div>
          <button className="btn btn-secondary">Support Faucet</button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="stats bg-base-100 shadow-lg">
          <div className="stat place-items-center">
            <div className="stat-title">Faucet Balance</div>
            <div className="stat-value">{`${contractBalance || "0"}ASTR`}</div>
            <div className="stat-desc">Remaining funds for Faucet</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Users</div>
            <div className="stat-value text-secondary">4,200</div>
            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
