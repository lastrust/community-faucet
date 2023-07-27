import { FAUCET_CONTRACT_ABI } from "@/util/abis";
import {
  SupportedContracts,
  supportedContracts,
  symbolList,
} from "@/util/config";
import { roundUp } from "@/util/format";
import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { formatEther } from "viem";
import { useAccount, useContractReads, useWalletClient } from "wagmi";

import { UsefulButton } from "../Button";
import ModalBase from "./Modal";

const FaucetModal: React.FC<{
  open: boolean;
  onChange: (open: boolean) => void;
  type: SupportedContracts;
}> = ({ type, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: walletClient } = useWalletClient();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { address } = useAccount();
  const { data: results } = useContractReads({
    contracts: [
      {
        address: supportedContracts[type].address,
        abi: FAUCET_CONTRACT_ABI,
        chainId: supportedContracts[type].chain,
        functionName: "dropSize",
      },
      {
        address: supportedContracts[type].address,
        abi: FAUCET_CONTRACT_ABI,
        chainId: supportedContracts[type].chain,
        functionName: "lastReceiptDate",
        args: [address as string],
      },
      {
        address: supportedContracts[type].address,
        abi: FAUCET_CONTRACT_ABI,
        chainId: supportedContracts[type].chain,
        functionName: "interval",
      },
    ],
    enabled: !!address,
  });

  const dropSize = formatEther((results?.[0].result as bigint) || BigInt(0));
  const lastReceiptDate = Number(results?.[1].result as bigint) || 0;
  const interval = Number(results?.[2].result as bigint) || 0;
  const nextDropTime = Date.now() / 1000 - lastReceiptDate - interval;

  const faucet = async () => {
    if (address && executeRecaptcha && walletClient) {
      setIsLoading(true);
      const token = await executeRecaptcha(`drop_to__${address}`);
      const message = `Student Faucet\n\nTarget: ${type}\nTime: ${new Date().getTime()}\nAddress: ${address.toLowerCase()}`;
      const signature = await walletClient.signMessage({ message });
      await fetch("/api/drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature, token }),
      });
      setIsLoading(false);
      props.onChange(false);
    }
  };

  return (
    <ModalBase id="faucet" {...props}>
      <h3 className="text-center text-3xl font-bold">Faucet</h3>
      {nextDropTime < 0 && (
        <div className="mb-4">
          <p className="text-center">You have already received the ASTR.</p>
        </div>
      )}
      <div className="overflow-x-auto text-center">
        <div className="stats justify-center bg-primary text-primary-content">
          <div className="stat place-items-center">
            <div className="stat-title">Next Drop Time</div>
            <CountDown time={Math.max(0, -nextDropTime)} />
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Faucet Amount</div>
            <div className="stat-value">
              {roundUp(dropSize)}
              <span className="text-2xl">{symbolList[type]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-action">
        <div className="text-sm">
          This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy" className="link">
            Privacy Policy
          </a>
          and
          <a href="https://policies.google.com/terms" className="link">
            Terms of Service
          </a>
          apply.
        </div>
        <UsefulButton
          className="btn btn-primary"
          disabled={nextDropTime < 0}
          isLoading={isLoading}
          onClick={() => void faucet()}
        >
          Get {symbolList[type]}
        </UsefulButton>
      </div>
    </ModalBase>
  );
};

export default FaucetModal;

export const CountDown: React.FC<{ time: number }> = ({ time }) => {
  return (
    <div className="text flex whitespace-nowrap sm:gap-1">
      <div>
        <span className="countdown font-mono text-4xl">
          {Math.floor(time / (60 * 60 * 24))}
        </span>
        days
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          {Math.floor(time / (60 * 60)) % 24}
        </span>
        hours
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          {Math.ceil(time / 60) % 60}
        </span>
        min
      </div>
    </div>
  );
};
