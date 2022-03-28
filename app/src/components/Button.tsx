import { useWeb3 } from "@/hooks";
import { switchChain } from "@/util/web3Util";
import React from "react";

export const UsefulButton: React.FC<
  JSX.IntrinsicElements["button"] & {
    isLoading?: boolean;
    loadingBtn?: React.ReactNode;
    forSign?: boolean;
  }
> = ({ isLoading: isLoadingProps, loadingBtn, forSign, ...props }) => {
  const {
    isLoading,
    account,
    connectWallet,
    isTargetChain,
    provider,
    isMetaMask,
  } = useWeb3();
  const handleErrorClick = () => {
    if (provider && isMetaMask) {
      void switchChain(provider);
    } else {
      void connectWallet();
    }
  };
  if (isLoadingProps && loadingBtn) {
    return <>{loadingBtn}</>;
  } else if (isLoading || isLoadingProps) {
    return <button className="btn loading btn-primary">Loading</button>;
  } else if (!isTargetChain && account && !forSign) {
    return (
      <button className="btn btn-error" onClick={handleErrorClick}>
        Chain connected is different
      </button>
    );
  } else if (account) {
    return <button {...props} />;
  } else {
    return (
      <button className="btn btn-primary" onClick={() => void connectWallet}>
        Connect Wallet
      </button>
    );
  }
};
