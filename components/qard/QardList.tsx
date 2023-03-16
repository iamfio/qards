'use client'

import Modal from '@/components/ui/modal/Modal'
import { Qard } from '@prisma/client'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import QardForm from './QardForm'
import QardListItem from './QardListItem'

const QardList = () => {
  const [qards, setQards] = useState<[]>()
  const [openNewQard, setOpenNewQard] = useState<boolean>(false)
  const handleOpenNewQard = () => setOpenNewQard((prev) => !prev)

  const getQards = useCallback(async () => {
    const response = await fetch('/api/qard')
    const data = await response.json()

    setQards(data.qards)
  }, [])

  useEffect(() => {
    getQards()
  }, [getQards])

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
          <Link
            href="/dashboard/profile/edit"
            className="btn btn-outline btn-secondary"
          >
            Edit Profile
          </Link>
        </div>
      </div>
      {openNewQard && (
        <Modal open={openNewQard} onClose={handleOpenNewQard}>
          <QardForm onClose={handleOpenNewQard} getQards={getQards} />
        </Modal>
      )}

      <div className="flex flex-col items-center w-full m-auto">
        {!qards && <div>You have no cards yet.</div>}

        {qards?.map((qard: Qard) => (
          <QardListItem {...qard} key={qard.id} getQards={getQards} />
        ))}
      </div>
    </div>
  )
}

export default QardList
