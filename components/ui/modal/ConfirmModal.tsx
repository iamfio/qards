"use client";

import Modal from "./Modal";

type ConfirmModalProps = {
  open: boolean;
  message: string;
  onConfirmAction: () => void;
  onCancelAction: () => void;
};

export default function ConfirmModal({
  open,
  message,
  onConfirmAction,
  onCancelAction,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onCancelAction}
    >
      <div className="p-8 rounded-lg shadow-xl card bg-base-100 w-96">
        <div className="card-body">
          <h2 className="text-xl card-title">{message}</h2>
          <div className="justify-end mt-4 card-actions">
            <button
              className="btn btn-primary"
              onClick={onConfirmAction}
            >
              Yes
            </button>
            <button
              className="btn btn-ghost"
              onClick={onCancelAction}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
