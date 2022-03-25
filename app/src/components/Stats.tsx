import { useContract, useWeb3 } from "@/hooks";
import { targetChain } from "@/util/web3Util";
import { ethers } from "ethers";
import { useState } from "react";

const Stats = () => {
  const { provider } = useWeb3();
  const [contractBalance, setContractBalance] = useState<string | null>(null);
  useContract({
    rpc: targetChain().rpcUrls[0],
    cb: async (contract) => {
      if (provider) {
        setContractBalance(
          ethers.utils.formatEther(await provider.getBalance(contract.address))
        );
      }
    },
  });
  return (
    <div className="flex justify-center">
      <div className="stats bg-base-100 shadow-lg">
        <div className="stat place-items-center">
          <div className="stat-title">Faucet Balance</div>
          <div className="stat-value">
            {contractBalance}
            <span className="text-2xl">ASTR</span>
          </div>
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
  );
};
export default Stats;
