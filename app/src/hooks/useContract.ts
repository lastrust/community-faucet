import { StudentFaucet, StudentFaucet__factory } from "@/util/contract";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

export const useContract = ({
  cb,
  rpc,
}: {
  cb?: (
    contract: StudentFaucet,
    provider: ethers.providers.JsonRpcProvider
  ) => void | Promise<void>;
  rpc?: string;
}) => {
  const [contract, setContract] = useState<StudentFaucet | null>(null);
  const { provider, isTargetChain } = useWeb3();
  useEffect(() => {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (provider && contractAddress && isTargetChain) {
      const signer = provider.getSigner();
      const FaucetContract = StudentFaucet__factory.connect(
        contractAddress,
        signer
      );
      setContract(FaucetContract);
    } else if (rpc && contractAddress) {
      const jsonRpcProvider = new ethers.providers.JsonRpcProvider(rpc);
      const FaucetContract = StudentFaucet__factory.connect(
        contractAddress,
        jsonRpcProvider
      );
      setContract(FaucetContract);
    } else {
      setContract(null);
    }
  }, [provider, isTargetChain]);
  useEffect(() => {
    if (contract) {
      cb &&
        void cb(
          contract,
          provider || new ethers.providers.JsonRpcProvider(rpc)
        );
    }
  }, [contract]);

  return contract;
};
