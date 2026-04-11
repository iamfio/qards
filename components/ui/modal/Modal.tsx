import { useRef } from "react";
import cn from "classnames";
import { useOnClickOutside } from "usehooks-ts";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  disableClickOutside?: boolean;
  onClose(): void;
};

export default function Modal({
  children,
  open,
  disableClickOutside,
  onClose,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () => {
    if (!disableClickOutside) {
      onClose();
    }
  });

  const modalClass = cn({
    "modal modal-middle": true,
    "modal-open": open,
  });

  return (
    <div className={modalClass}>
      <div ref={ref}>{children}</div>
    </div>
  );
}
