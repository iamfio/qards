'use client'

import { Qard } from '@prisma/client'
import { useState } from 'react'
import Modal from '../modal/Modal'
import QardForm from './QardForm'
import QardListItem from './QardListItem'

type QardListProps = {
  qards?: Qard[]
}

const QardList = ({ qards }: QardListProps) => {
  const [openNewQard, setOpenNewQard] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenNewQard = () => setOpenNewQard((prev) => !prev)

  return (
    <div>
      <div className="flex justify-center">
        <div className="mx-4 my-2">
          <button
            className="btn btn-outline btn-primary"
            onClick={handleOpenNewQard}
          >
            New Qard
          </button>
        </div>
        <div className="mx-4 my-2">
          <button className="btn btn-outline btn-secondary">
            Edit Profile
          </button>
        </div>
      </div>
      {openNewQard && (
        <Modal open={openNewQard} onClose={handleOpenNewQard}>
          <QardForm onClose={handleOpenNewQard} />
        </Modal>
      )}

      <div className="flex flex-col items-center w-full m-auto">
        {!qards && <div>You have no cards yet.</div>}

        {qards?.map((qard: Qard) => (
          <QardListItem {...qard} key={qard.id} />
        ))}
      </div>
    </div>
  )
}

export default QardList
