import { ethers } from "ethers";

type providerEvents = {
  accountsChanged: (ids: string[]) => void;
  chainChanged: (chainId: string) => void;
  disconnect: () => void;
};

export interface Web3ProviderInterface
  extends ethers.providers.ExternalProvider {
  isMetaMask: boolean;
  on: <T extends keyof providerEvents>(
    event: T,
    callback: providerEvents[T]
  ) => void;
}

export interface Account {
  id: string;
  abbreviatedId: string;
  ethName: string | null;
  avatar: string | null;
}
export interface Web3ContextInterface {
  provider: ethers.providers.Web3Provider | null;
  account: Account | null;
  chainId: string | null;
  isMetaMask: boolean;
  isLoading: boolean;
  isTargetChain: boolean;
  error: string;
  disconnect: () => void;
  connectWallet: (opt?: {
    isRequestAccount?: boolean;
    wallet?: "metamask" | "wallet_connect";
  }) => Promise<void>;
  switchToTargetChain: () => Promise<void>;
}
