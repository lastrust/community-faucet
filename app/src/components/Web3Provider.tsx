import React, { createContext, useEffect, useState } from "react";
import { Web3ContextInterface } from "../types/web3Types";
import {
  checkIsTargetChain,
  getConnectedAccount,
  getAccountByIds,
  getChainId,
  getWeb3Provider,
} from "../util/web3Util";

type Interface = Web3ContextInterface;

const getDefaultContextValue = (): Web3ContextInterface => ({
  provider: null,
  account: null,
  chainId: null,
  isLoading: true,
  isMetaMask: false,
  isTargetChain: false,
  error: "",
  connectWallet: async () => {
    /*初期化前用 */
  },
  disconnect: () => {
    /*初期化前用 */
  },
  switchToTargetChain: async () => {
    /*初期化前用 */
  },
});

export const Web3Context = createContext<Web3ContextInterface>(
  getDefaultContextValue()
);

export const Web3Provider: React.FC<
  React.PropsWithChildren<{ key?: string }>
> = ({ children }) => {
  const [provider, setProvider] = useState<Interface["provider"]>(null);
  const [account, setAccount] = useState<Interface["account"]>(null);
  const [chainId, setChainId] = useState<Interface["chainId"]>(null);
  const [isLoading, setIsLoading] = useState<Interface["isLoading"]>(false);
  const [isMetaMask, setIsMetaMask] = useState<Interface["isMetaMask"]>(false);
  const [isTargetChain, setIsTargetChain] =
    useState<Interface["isTargetChain"]>(false);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const [instance, _provider] = await getWeb3Provider();
      setIsMetaMask(instance.isMetaMask);
      instance.on(
        "accountsChanged",
        (e: string[]) => void handleAccountsChanged(e)
      );
      instance.on("chainChanged", handleChainChanged);
      instance.on("disconnect", resetWeb3);
      localStorage.setItem("auto_connect", "yes");
      const accountPromise = async () =>
        setAccount(await getConnectedAccount(_provider));
      const providerPromise = async () => {
        setIsTargetChain(checkIsTargetChain(await getChainId(_provider)));
        setProvider(_provider);
      };
      await Promise.all([accountPromise(), providerPromise()]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const resetWeb3 = () => {
    setProvider(null);
    setAccount(null);
    setChainId(null);
    setIsTargetChain(false);
  };

  const handleAccountsChanged = async (_accountIds: string[]) => {
    console.log(_accountIds);
    try {
      setIsLoading(true);
      setAccount(await getAccountByIds(_accountIds));
      !_accountIds.length && resetWeb3();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChainChanged = (_chainId: string) => {
    setChainId(_chainId);
    setIsTargetChain(checkIsTargetChain(_chainId));
  };

  useEffect(() => {
    localStorage.getItem("auto_connect") === "yes" && connectWallet();
    return resetWeb3;
  }, []);
  return (
    <Web3Context.Provider
      value={{
        ...getDefaultContextValue(),
        provider,
        account,
        chainId,
        isLoading,
        isMetaMask,
        isTargetChain,
        connectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
