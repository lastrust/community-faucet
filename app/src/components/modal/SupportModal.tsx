import { SupportedContracts, supportedContracts, symbolList } from "@/config";
import { FAUCET_CONTRACT_ABI } from "@/constants/abis";
import { useInputs } from "@/hooks";
import { useState } from "react";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "wagmi/actions";

import { roundUp } from "@/util/format";
import { parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { UsefulButton } from "../Button";
import ModalBase from "./Modal";

const SupportModal: React.FC<{
  open: boolean;
  onChange: (open: boolean) => void;
  type: SupportedContracts;
}> = (props) => {
  const account = useAccount();
  const { data: balance } = useBalance(account);
  const { value, handler } = useInputs({
    name: "",
    icon: "",
    value: "",
  });
  const [transaction, setTransaction] = useState(false);

  const support = async () => {
    setTransaction(true);
    const config = await prepareWriteContract({
      address: supportedContracts[props.type].address,
      abi: FAUCET_CONTRACT_ABI,
      chainId: supportedContracts[props.type].chain.id,
      functionName: "support",
      value: parseEther(value.value),
      args: [value.name, value.icon],
    });
    const tx = await writeContract(config);

    await waitForTransaction(tx);

    setTransaction(false);
    props.onChange(false);
  };

  return (
    <ModalBase id="support" {...props}>
      <h3 className="text-xl font-bold">Enter info about Support</h3>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-bold">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type Your Name"
          className="input input-bordered"
          value={value.name}
          onChange={handler("name")}
          disabled={transaction}
        />
        <label className="label">
          <span className="label-text text-lg font-bold">Icon URL(option)</span>
        </label>
        <input
          type="text"
          placeholder="Icon URL"
          className="input input-bordered"
          value={value.icon}
          onChange={handler("icon")}
          disabled={transaction}
        />
        <label className="label">
          <span className="label-text text-lg font-bold">
            Amount Of Support
          </span>
        </label>
        <label className="input-group w-full">
          <input
            type="text"
            placeholder={`Type Amount Of Support (max ${roundUp(
              balance?.formatted
            )})`}
            className="input input-bordered w-full"
            value={value.value}
            onChange={handler("value")}
            disabled={transaction}
          />
          <span>{symbolList[props.type]}</span>
        </label>
      </div>

      <div className="modal-action">
        <UsefulButton
          className="btn btn-primary"
          isLoading={transaction}
          onClick={() => void support()}
        >
          Submit
        </UsefulButton>
      </div>
    </ModalBase>
  );
};
export default SupportModal;
