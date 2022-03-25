import { stopPropagation } from "@/util/inputUtil";
import React, { useEffect } from "react";

const ModalBase: React.FC<{
  id: string;
  children: React.ReactNode;
  open: boolean;
  onChange: (open: boolean) => void;
}> = ({ open, onChange, id, children }) => {
  const toggleOpen = () => onChange(!open);

  useEffect(() => {
    if (open) {
      window.location.href = `#${id}`;
    } else {
      window.location.href = `#`;
    }
  }, [open]);
  return (
    <div className="modal" id={id} onClick={toggleOpen}>
      <div className="modal-box" onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
};
export default ModalBase;
