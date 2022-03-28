import { useContract, useInputs } from "@/hooks";
import { usefulFixed } from "@/util";
import { targetChain } from "@/util/web3Util";
import { ethers } from "ethers";

const Stats = () => {
  const { value, margeValue } = useInputs({
    contractBalance: "0.0",
    totalDrop: "0.0",
    supporter: "0",
  });

  useContract({
    rpc: targetChain().rpcUrls[0],
    cb: async (contract, provider) => {
      if (contract && provider) {
        margeValue({
          contractBalance: usefulFixed(
            ethers.utils.formatEther(
              await provider.getBalance(contract.address)
            ),
            2
          ),
          totalDrop: usefulFixed(
            ethers.utils.formatEther(await contract.totalDrop()),
            2
          ),
          supporter: (await contract.numberOfSupporter()).toString(),
        });
      }
    },
  });
  return (
    <div className="mx-2 flex justify-center">
      <div className="stats bg-base-100 shadow-lg">
        <div className="stat place-items-center">
          <div className="stat-title">Faucet Balance</div>
          <div className="stat-value">
            {value.contractBalance}
            <span className="text-2xl">ASTR</span>
          </div>
          <div className="stat-desc">Remaining funds</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Total Drop</div>
          <div className="stat-value text-secondary">
            {value.totalDrop}
            <span className="text-2xl">ASTR</span>
          </div>
          <div className="stat-desc text-secondary">AStar from here</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Supporter</div>
          <div className="stat-value">{value.supporter}</div>
          <div className="stat-desc">Faucet Supporter</div>
        </div>
      </div>
    </div>
  );
};
export default Stats;
