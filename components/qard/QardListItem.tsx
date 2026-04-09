'use client'

import { useEffect, useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import { Qard } from '@prisma/client'
import { capitalize } from '@/lib/utils'

import QardForm from '@/components/qard/QardForm'
import IconGeneric from '@/components/ui/icons/IconGeneric'
import Modal from '@/components/ui/modal/Modal'
import ConfirmModal from '@/components/ui/modal/ConfirmModal'
import AlertDialog from '@/components/ui/modal/AlertDialog' // Import the new AlertDialog

type QardListItemProps = {
  qard: Qard
  getQards(): Promise<void>
  index: number
}

export default function QardListItem({
  qard,
  getQards,
  index,
}: QardListItemProps) {
  const [openEditQard, setOpenEditQard] = useState<boolean>(false)
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false)
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')

  const handleOpenEditQard = () => setOpenEditQard((prev) => !prev)
  const handleOpenConfirmDelete = () => setOpenConfirmDelete((prev) => !prev)
  const handleOpenAlertDialog = () => setOpenAlertDialog((prev) => !prev)

  async function confirmDeleteQard() {
    try {
      const response = await fetch('/api/qard', {
        method: 'DELETE',
        body: JSON.stringify(qard.id),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error(errorData.message || 'Failed to delete Qard')
      }

      await getQards()
    } catch (error: any) {
      console.error('Error deleting Qard:', error)
      setAlertMessage(error.message || 'Failed to delete Qard. Please try again.')
      setOpenAlertDialog(true) // Open alert modal on error
    } finally {
      setOpenConfirmDelete(false) // Always close the confirm modal
    }
  }

  useEffect(() => {
    // Only update if the position in DB doesn't match the current index
    if (qard.position !== index) {
      const updatePosition = async (qard: Qard) => {
        const response = await fetch('/api/qard', {
          method: 'PATCH',
          body: JSON.stringify({
            ...qard,
            position: index,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to update position')
        }

        await getQards()
      }

      updatePosition(qard).catch((error: any) => {
        console.error('Failed to update position:', error)
        setAlertMessage(error.message || 'Failed to update position. Please try again.')
        setOpenAlertDialog(true)
      })
    }
  }, [index, qard, getQards])

  return (
    <Draggable draggableId={String(qard.id)} index={index}>
      {(provided, snapshot) => (
        <div
          key={qard.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`qard-list-item ${snapshot.isDragging ? 'border-4 border-info/80' : 'border-inherit'
            }`}
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

            {openConfirmDelete && (
              <ConfirmModal
                open={openConfirmDelete}
                message="Delete Qard?"
                onConfirmAction={confirmDeleteQard}
                onCancelAction={handleOpenConfirmDelete}
              />
            )}

            {openAlertDialog && (
              <AlertDialog
                open={openAlertDialog}
                message={alertMessage}
                onCloseAction={handleOpenAlertDialog}
              />
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
                  onClick={handleOpenConfirmDelete}
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
