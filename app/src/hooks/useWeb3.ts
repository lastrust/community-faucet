import { Web3Context } from "@/components/Web3Provider";
import { Web3ContextInterface } from "@/types/web3Types";
import { useContext } from "react";

export const useWeb3 = (): Web3ContextInterface => useContext(Web3Context);
