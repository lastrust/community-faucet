import { SupportedContracts, supportedContracts } from "@/config";
import { FAUCET_CONTRACT_ABI } from "@/constants/abis";
import { roundUp } from "@/util/format";
import { formatEther } from "viem";
import { useBalance, useContractReads } from "wagmi";

const StatsBase: React.FC<{
  type: SupportedContracts;
  symbol: string;
  vertical?: boolean;
}> = ({ type, symbol, vertical }) => {
  const { data: contractBalance } = useBalance({
    address: supportedContracts[type].address,
    chainId: supportedContracts[type].chain.id,
  });
  const { data: results } = useContractReads({
    contracts: [
      {
        chainId: supportedContracts[type].chain.id,
        address: supportedContracts[type].address,
        abi: FAUCET_CONTRACT_ABI,
        functionName: "totalDrop",
      },
      {
        chainId: supportedContracts[type].chain.id,
        address: supportedContracts[type].address,
        abi: FAUCET_CONTRACT_ABI,
        functionName: "numberOfSupporter",
      },
    ],
  });

  const totalDrop = formatEther((results?.[0]?.result as bigint) || BigInt(0));
  const supporter = Number(results?.[1]?.result) || 0;

  return (
    <div
      className={`stats bg-base-100 shadow ${
        vertical ? "stats-vertical w-full" : ""
      }`}
    >
      <div className="stat place-items-center">
        <div className="stat-title">Faucet Balance</div>
        <div className="stat-value">
          {roundUp(contractBalance?.formatted)}
          <span className="text-2xl">{symbol}</span>
        </div>
        <div className="stat-desc">Remaining funds</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Total Drop</div>
        <div className="stat-value text-secondary">
          {roundUp(totalDrop)}
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
