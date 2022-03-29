import { useWeb3 } from "@/hooks";
import { chainParameters } from "@/util/config";
import { checkIsTargetChain, switchChain } from "@/util/web3Util";
import React from "react";

export const UsefulButton: React.FC<
  JSX.IntrinsicElements["button"] & {
    isLoading?: boolean;
    loadingBtn?: React.ReactNode;
    forSign?: boolean;
    target?: keyof typeof chainParameters;
  }
> = ({ isLoading: isLoadingProps, loadingBtn, forSign, target, ...props }) => {
  const { isLoading, account, connectWallet, chainId, provider, isMetaMask } =
    useWeb3();
  const targetChainId = target && chainParameters[target].chainId;
  const handleErrorClick = () => {
    if (provider && isMetaMask) {
      void switchChain(provider, targetChainId);
    } else {
      void connectWallet();
    }
  };
  if (isLoadingProps && loadingBtn) {
    return <>{loadingBtn}</>;
  } else if (isLoading || isLoadingProps) {
    return <button className="btn loading btn-primary">Loading</button>;
  } else if (
    !checkIsTargetChain(chainId, targetChainId) &&
    account &&
    !forSign
  ) {
    return (
      <button className="btn btn-error" onClick={handleErrorClick}>
        Chain connected is different
      </button>
    );
  } else if (account) {
    return <button {...props} />;
  } else {
    return (
      <button className="btn btn-primary" onClick={() => void connectWallet()}>
        Connect Wallet
      </button>
    );
  }
};
