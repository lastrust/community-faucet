import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { VscDebugDisconnect } from "react-icons/vsc";

export const UsefulButton: React.FC<
  JSX.IntrinsicElements["button"] & {
    isLoading?: boolean;
  }
> = ({ className, isLoading, ...props }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openChainModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (chain?.unsupported) {
          return (
            <button
              className="btn btn-ghost btn-square"
              onClick={openChainModal}
            >
              <VscDebugDisconnect size="2rem" color="#f21361" />
            </button>
          );
        }
        if (connected && !isLoading) {
          return <button className={className} {...props} />;
        }
        if (ready) {
          return (
            <button className="btn btn-ghost" onClick={openConnectModal}>
              Connect
            </button>
          );
        }
        return <div className="btn btn-ghost">Loading</div>;
      }}
    </ConnectButton.Custom>
  );
};
