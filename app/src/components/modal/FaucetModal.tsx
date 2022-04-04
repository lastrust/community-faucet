import { useContract, useWeb3 } from "@/hooks";
import { contractTypes, symbolList } from "@/util/config";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { UsefulButton } from "../Button";
import ModalBase from "./Modal";

const FaucetModal: React.FC<{
  open: boolean;
  onChange: (open: boolean) => void;

  type: contractTypes;
}> = ({ type, ...props }) => {
  const [isStudent, setIsStudent] = useState(false);
  const [nextTime, setNextTime] = useState<number>(Infinity);
  const [amount, setAmount] = useState<number | string>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { account, provider } = useWeb3();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const contract = useContract(type, { fetchOnly: true });
  const handler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIsStudent(e.target.checked);

  const faucet = async () => {
    if (account && provider && executeRecaptcha) {
      setIsLoading(true);
      const token = await executeRecaptcha("faucet_astar");
      const message = `Student Faucet\n\nTarget: ${type}\nTime: ${new Date().getTime()}\nAddress: ${
        account.id
      }`;
      const signature = await provider.getSigner().signMessage(message);
      await fetch("/api/drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature, token }),
      });
      setIsLoading(false);
      props.onChange(false);
    }
  };

  useEffect(() => {
    if (account && contract) {
      void (async () => {
        const nextTime =
          Date.now() / 1000 -
          (await contract.lastReceiptDate(account.id)).toNumber() -
          (await contract.interval()).toNumber();
        setNextTime(nextTime);
      })();
    }
    if (contract) {
      void (async () => {
        setAmount(ethers.utils.formatEther(await contract.dropSize()));
      })();
    }
  }, [contract, account]);
  return (
    <ModalBase id="faucet" {...props}>
      <h3 className="text-center text-3xl font-bold">Faucet</h3>
      {nextTime < 0 && (
        <p className="mb-4 text-center">You have already received the ASTR.</p>
      )}
      <div className="overflow-x-auto text-center">
        <div className="stats justify-center bg-primary text-primary-content">
          <div className="stat place-items-center">
            <div className="stat-title">Next Drop Time</div>
            <CountDown time={Math.max(0, -nextTime)} />
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Faucet Amount</div>
            <div className="stat-value">
              {amount}
              <span className="text-2xl">{symbolList[type]}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-xl font-bold text-red-700">
            You are a student, right?
          </span>
          <input type="checkbox" className="checkbox" onChange={handler} />
        </label>
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
          forSign={true}
          disabled={!isStudent || nextTime < 0}
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
