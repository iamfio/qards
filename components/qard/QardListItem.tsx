'use client'

import { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import { Qard } from '@prisma/client'
import { capitalize } from '@/lib/utils'

import QardForm from '@/components/qard/QardForm'
import IconGeneric from '@/components/ui/icons/IconGeneric'
import Modal from '@/components/ui/modal/Modal'

type QardListItemProps = {
  qard: Qard
  getQards(): Promise<void>
  index: number
}

const QardListItem = ({ qard, getQards, index }: QardListItemProps) => {
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
  }

  useEffect(() => {
    const updatePosition = async (qard: Qard) => {
      const response = await fetch('/api/qard', {
        method: 'PATCH',
        body: JSON.stringify({
          ...qard,
          position: index,
        }),
      })

      if (response.ok) {
        getQards()
      }
    }

    updatePosition(qard)
  }, [index])

  return (
    <Draggable draggableId={String(qard.id)} index={index}>
      {(provided) => (
        <div
          key={qard.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="w-full px-2 py-4 my-2 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:shadow-xl"
        >
          <div className="flex items-center">
            {openEditQard && (
              <Modal open={openEditQard} onClose={handleOpenEditQard}>
                <QardForm
                  isEdit
                  qardId={qard.id}
                  onClose={handleOpenEditQard}
                  accountLink={qard.accountLink}
                  accountName={qard.accountName}
                  getQards={getQards}
                />
              </Modal>
            )}

            <div className="mr-4 avatar placeholder">
              <div className="w-12 rounded-full">
                {qard.accountLink === null ? (
                  <IconGeneric name={'undef'} />
                ) : (
                  <IconGeneric name={qard.accountLink} />
                )}
              </div>
            </div>
            <div className="flex-1">{capitalize(qard.accountName!)}</div>
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
                  onClick={() => deleteQard(qard.id)}
                >
                  <AiOutlineDelete className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default QardListItem
