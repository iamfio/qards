'use client'

import DotLoader from '@/components/loader/DotLoader'
import QardForm from '@/components/qard/QardForm'
import QardListItem from '@/components/qard/QardListItem'
import Modal from '@/components/ui/modal/Modal'
import { Qard } from '@prisma/client'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

const QardList = () => {
  const [qards, setQards] = useState<[]>()
  const [openNewQard, setOpenNewQard] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleOpenNewQard = () => setOpenNewQard((prev) => !prev)

  const getQards = useCallback(async () => {
    setLoading(true)

    const response = await fetch('/api/qard')
    const userData = await response.json()

    setQards(userData.qards)
    setLoading(false)
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
        {loading && <DotLoader />}

        {qards?.map((qard: Qard) => (
          <QardListItem {...qard} key={qard.id} getQards={getQards} />
        ))}

        {qards?.length === 0 && (
          <div className="p-8 my-10 text-xl rounded-lg bg-primary-content">
            You have no cards yet
          </div>
        )}
      </div>
    </div>
  )
}

export default QardList
