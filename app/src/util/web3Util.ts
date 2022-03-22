import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Account, Web3ProviderInterface } from "../types/web3Types";

const providerOptions = async () => ({
  walletconnect: {
    package: (await import("@walletconnect/web3-provider")).default,
    options: {
      rpc: {
        1: `https://mainnet.infura.io/v3/${
          process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || ""
        }`,
        80001: `https://rpc-mumbai.matic.today`,
        81: `https://rpc.shibuya.astar.network:8545`,
        592: `https://rpc.astar.network:8545`,
      },
    },
  },
});

export const getInfuraProvider = () =>
  new ethers.providers.InfuraProvider(
    "homestead",
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
  );

export const getWeb3Provider = async (): Promise<
  [Web3ProviderInterface, ethers.providers.Web3Provider]
> => {
  const web3Modal = new Web3Modal({
    providerOptions: await providerOptions(),
    cacheProvider: true,
  });
  const instance = (await web3Modal.connect()) as Web3ProviderInterface;
  const provider = new ethers.providers.Web3Provider(instance, "any");
  return [instance, provider];
};

export const getAccountIds = (
  provider: ethers.providers.Web3Provider
): Promise<string[]> => provider.send("eth_accounts", []) as Promise<string[]>;

export const fetchAccount = async (id: string): Promise<Account> => {
  const provider = getInfuraProvider();
  const abbreviatedId = `${id.slice(0, 4)}...${id.slice(-3)}`;
  const [ethName, avatar] = await Promise.all([
    provider.lookupAddress(id),
    provider.getAvatar(id),
  ]);
  return { id, abbreviatedId, ethName, avatar };
};

export const fetchAccounts = (accountIds: string[]): Promise<Account[]> =>
  Promise.all(accountIds.map(fetchAccount));

export const selectFirstAccount = (accounts: Account[]): Account | null =>
  accounts[0] || null;

export const getConnectedAccount = async (
  provider: ethers.providers.Web3Provider
): Promise<Account | null> =>
  selectFirstAccount(await fetchAccounts(await getAccountIds(provider)));

export const getAccountByIds = async (ids: string[]): Promise<Account | null> =>
  selectFirstAccount(await fetchAccounts(ids));

export const getChainId = (
  provider: ethers.providers.Web3Provider
): Promise<string> => provider.send("eth_chainId", []) as Promise<string>;

export const checkIsTargetChain = (chainId: string | number) =>
  Number(chainId) === Number(process.env.NEXT_PUBLIC_TARGET_CHAIN_ID);

export const switchChain = async (
  provider: ethers.providers.Web3Provider,
  chainId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID || ""
) => {
  if (chainId in chainParameters) {
    const chainParameter =
      chainParameters[chainId as keyof typeof chainParameters];
    if (!chainParameter) new Error("chain parameter not found");
    await provider.send("wallet_addEthereumChain", [chainParameter]);
    await provider.send("wallet_switchEthereumChain", [{ chainId }]);
  }
};

export const chainParameters = {
  "0x89": {
    chainId: "0x89",
    blockExplorerUrls: ["https://polygonscan.com/"],
    chainName: "Polygon Mainnet",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://polygon-rpc.com/"],
  },
  "0x13881": {
    chainId: "0x13881",
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    chainName: "Matic Mumbai",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  },
  "0x51": {
    chainId: "0x51",
    blockExplorerUrls: ["https://shibuya.subscan.io"],
    chainName: "Shibuya Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "SBY",
      symbol: "SBY",
    },
    rpcUrls: ["https://rpc.shibuya.astar.network:8545"],
  },
  "0x250": {
    chainId: "0x250",
    blockExplorerUrls: ["https://astar.subscan.io"],
    chainName: "Astar Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "ASTR",
      symbol: "ASTR",
    },
    rpcUrls: ["https://rpc.astar.network:8545"],
  },
};
