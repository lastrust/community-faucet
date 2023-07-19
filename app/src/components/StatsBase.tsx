import { useContract, useJsonProvider } from "@/hooks";
import { usefulFixed } from "@/util";
import { ContractTypes } from "@/util/config";
import { CommunityFaucetV2 } from "@/util/contract";
import { ethers } from "ethers";
import { useQuery } from "react-query";

const StatsBase: React.FC<{
  type: ContractTypes;
  symbol: string;
  vertical?: boolean;
}> = ({ type, symbol, vertical }) => {
  const contract = useContract(type, { fetchOnly: true }) as CommunityFaucetV2;
  const provider = useJsonProvider(type);
  const { data: contractBalance } = useQuery(
    ["contractBalance", type],
    async () =>
      usefulFixed(
        ethers.utils.formatEther(await provider.getBalance(contract.address)),
        2
      ),
    { enabled: Boolean(contract), initialData: "0.00" }
  );
  const { data: totalDrop } = useQuery(
    ["totalDrop", type],
    async () =>
      usefulFixed(ethers.utils.formatEther(await contract.totalDrop()), 2),
    { enabled: Boolean(contract), initialData: "0.00" }
  );
  const { data: supporter } = useQuery(
    ["supporter", type],
    async () => (await contract.numberOfSupporter()).toString(),
    { enabled: Boolean(contract), initialData: "0" }
  );

  return (
    <div
      className={`stats bg-base-100 shadow ${
        vertical ? "stats-vertical w-full" : ""
      }`}
    >
      <div className="stat place-items-center">
        <div className="stat-title">Faucet Balance</div>
        <div className="stat-value">
          {contractBalance}
          <span className="text-2xl">{symbol}</span>
        </div>
        <div className="stat-desc">Remaining funds</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Total Drop</div>
        <div className="stat-value text-secondary">
          {totalDrop}
          <span className="text-2xl">{symbol}</span>
        </div>
        <div className="stat-desc text-base font-bold text-secondary">
          {symbol} from here
        </div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Supporter</div>
        <div className="stat-value">{supporter}</div>
        <div className="stat-desc">Faucet Supporter</div>
      </div>
    </div>
  );
};
export default StatsBase;
