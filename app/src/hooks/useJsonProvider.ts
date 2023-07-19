import { ContractTypes, contractList } from "@/util/config";
import { ethers } from "ethers";

export const useJsonProvider = (type: ContractTypes) =>
  new ethers.providers.JsonRpcBatchProvider(contractList[type].rpc);
