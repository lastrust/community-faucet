import { useContract, useWeb3 } from "@/hooks";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { UsefulButton } from "../Button";
import ModalBase from "./Modal";

const FaucetModal: React.FC<{
  open: boolean;
  onChange: (open: boolean) => void;
}> = (props) => {
  const [isStudent, setIsStudent] = useState(false);
  const [nextTime, setNextTime] = useState<number>(Infinity);
  const [amount, setAmount] = useState<number | string>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { account, provider } = useWeb3();
  const contract = useContract({ fetchOnly: true });
  const handler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIsStudent(e.target.checked);

  const faucet = async () => {
    if (account && provider) {
      setIsLoading(true);
      const message = `AStar Faucet\n\nTime: ${new Date().getTime()}\nAddress: ${
        account.id
      }`;
      const signature = await provider.getSigner().signMessage(message);
      const res = await fetch("/api/drop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature }),
      });
      console.log(await res.json());
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
      <div className="stats w-full justify-center bg-primary text-primary-content">
        <div className="stat place-items-center">
          <div className="stat-title">Next Drop Time</div>
          <CountDown time={Math.max(0, -nextTime)} />
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Faucet Amount</div>
          <div className="stat-value">
            {amount}
            <span className="text-2xl">ASTR</span>
          </div>
        </div>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-xl">You are a student, right?</span>
          <input type="checkbox" className="checkbox" onChange={handler} />
        </label>
      </div>
      <div className="modal-action">
        <UsefulButton
          className="btn btn-primary"
          forSign={true}
          disabled={!isStudent || nextTime < 0}
          isLoading={isLoading}
          onClick={() => void faucet()}
        >
          Get AStar
        </UsefulButton>
      </div>
    </ModalBase>
  );
};

export default FaucetModal;

export const CountDown: React.FC<{ time: number }> = ({ time }) => {
  return (
    <div className="flex gap-1">
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
