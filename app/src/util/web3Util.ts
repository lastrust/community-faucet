import { ethers } from "ethers";
import invariant from "tiny-invariant";
import Web3Modal from "web3modal";
import { Account, Web3ProviderInterface } from "../types/web3Types";
import { chainParameters, providerOptions } from "./config";

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

export const selectFirst = <T>(accounts: T[]): T | null => accounts[0] || null;

export const getConnectedAccount = async (
  provider: ethers.providers.Web3Provider
): Promise<Account | null> =>
  selectFirst(await fetchAccounts(await getAccountIds(provider)));

export const getAccountByIds = async (ids: string[]): Promise<Account | null> =>
  selectFirst(await fetchAccounts(ids));

export const getChainId = (
  provider: ethers.providers.Web3Provider
): Promise<string> => provider.send("eth_chainId", []) as Promise<string>;

export const checkIsTargetChain = (
  chainId: string | number | null | undefined,
  targetId?: string | number | null | undefined
) =>
  Number(chainId) ===
  Number(targetId || process.env.NEXT_PUBLIC_TARGET_CHAIN_ID);

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

export const targetChain =
  (): typeof chainParameters[keyof typeof chainParameters] => {
    const chainId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID;
    invariant(chainId, "This should not throw!");
    invariant(chainId in chainParameters, "This should not throw!");
    return chainParameters[chainId as keyof typeof chainParameters];
  };
