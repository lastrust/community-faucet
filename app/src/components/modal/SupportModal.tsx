import { useWeb3 } from "@/hooks";
import { UsefulButton } from "../Button";
import ModalBase from "./Modal";

const SupportModal: React.FC<{
  open: boolean;
  onChange: (open: boolean) => void;
}> = (props) => {
  const { account } = useWeb3();
  return (
    <ModalBase id="support" {...props}>
      <h3 className="text-lg font-bold">Support</h3>
      <div className="modal-action">
        <UsefulButton className="btn btn-primary">Submit</UsefulButton>
      </div>
    </ModalBase>
  );
};
export default SupportModal;
