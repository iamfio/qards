'use client'

import QardForm from '@/components/qard/QardForm'
import IconGeneric from '@/components/ui/icons/IconGeneric'
import Modal from '@/components/ui/modal/Modal'
import { capitalize } from '@/lib/utils'
import { Qard } from '@prisma/client'
import { useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

type QardListItemProps = {
  id: Qard['id']
  accountName: Qard['accountName']
  accountLink: Qard['accountLink']
  getQards(): Promise<void>
}

const QardListItem = ({
  id,
  accountName,
  accountLink,
  getQards,
}: QardListItemProps) => {
  const [openEditQard, setOpenEditQard] = useState<boolean>(false)
  const handleOpenEditQard = () => setOpenEditQard((prev) => !prev)

  const deleteQard = async (qardId: string) => {
    if (window.confirm('Delete Qard?')) {
      const response = await fetch('/api/qard', {
        method: 'DELETE',
        body: JSON.stringify(qardId),
      })

      if (response.ok) {
        getQards()
      }
    }
    return null
  }

  return (
    <div className="w-full px-2 py-4 my-2 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:shadow-xl">
      <div className="flex items-center">
        {openEditQard && (
          <Modal open={openEditQard} onClose={handleOpenEditQard}>
            <QardForm
              isEdit
              qardId={id}
              onClose={handleOpenEditQard}
              accountLink={accountLink ?? ''}
              accountName={accountName ?? ''}
              getQards={getQards}
            />
          </Modal>
        )}

        <div className="mr-4 avatar placeholder">
          <div className="w-12 rounded-full">
            {accountLink === null ? (
              <IconGeneric name={'undef'} />
            ) : (
              <IconGeneric name={accountLink} />
            )}
          </div>
        </div>
        <div className="flex-1">{capitalize(accountName!)}</div>
        <div className="flex justify-around ">
          <div className="mx-1">
            <button
              className="btn btn-sm btn-primary btn-square btn-outline"
              onClick={handleOpenEditQard}
            >
              <AiOutlineEdit className="text-xl" />
            </button>
          </div>

          <div className="mx-1">
            <button
              className="btn btn-sm btn-error btn-square btn-outline"
              onClick={() => deleteQard(id)}
            >
              <AiOutlineDelete className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QardListItem
