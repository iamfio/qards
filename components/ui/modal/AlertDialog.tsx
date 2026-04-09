'use client'

import Modal from './Modal'

type AlertDialogProps = {
  open: boolean
  message: string
  onCloseAction: () => void
}

export default function AlertDialog({
  open,
  message,
  onCloseAction,
}: AlertDialogProps) {
  return (
    <Modal open={open} onClose={onCloseAction}>
      <div className="p-8 rounded-lg shadow-xl card bg-base-100 w-96">
        <div className="card-body">
          <h2 className="text-xl card-title">{message}</h2>
          <div className="justify-end mt-4 card-actions">
            <button className="btn btn-primary" onClick={onCloseAction}>
              OK
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
