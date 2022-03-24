import { StudentFaucet, StudentFaucet__factory } from "@/util/contract";
import { useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

export const useContract = (
  cb?: (contract: StudentFaucet) => void | Promise<void>
) => {
  const [contract, setContract] = useState<StudentFaucet | null>(null);
  const { provider, isTargetChain } = useWeb3();
  useEffect(() => {
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (provider && contractAddress && isTargetChain) {
      const signer = provider.getSigner();
      const ArticlesContract = StudentFaucet__factory.connect(
        contractAddress,
        signer
      );
      setContract(ArticlesContract);
    } else {
      setContract(null);
    }
  }, [provider, isTargetChain]);
  useEffect(() => {
    if (contract) {
      cb && void cb(contract);
    }
  }, [contract]);

  return contract;
};
