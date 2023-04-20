'use client'

import { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Qard } from '@prisma/client'

import DotLoader from '@/components/loader/DotLoader'
import QardForm from '@/components/qard/QardForm'
import QardListItem from '@/components/qard/QardListItem'
import Modal from '@/components/ui/modal/Modal'

const QardList: React.FC = () => {
  const [qards, setQards] = useState<Qard[]>()
  const [openNewQard, setOpenNewQard] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleOpenNewQard = () => setOpenNewQard((prev) => !prev)

  const getQards = useCallback(async () => {
    setLoading(true)

    const response = await fetch('/api/qard')
    const { qards } = await response.json()

    setQards(qards)
    setLoading(false)
  }, [])

  const reorder = (
    qardsOrder: Qard[],
    startIndex: number,
    endIndex: number
  ) => {
    const [removed] = qardsOrder.splice(startIndex, 1)

    qardsOrder.splice(endIndex, 0, removed)

    return qardsOrder
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const qardsOrdered = reorder(
      qards!,
      result.source.index,
      result.destination.index
    )

    setQards(qardsOrdered)

    if (window.navigator.vibrate) {
      window.navigator.vibrate(100)
    }
  }

  useEffect(() => {
    getQards()
  }, [getQards])

  return (
    <div>
      <div className="flex justify-center">
        <div className="mx-4 mt-4 mb-6">
          <button
            className="btn glass btn-wide bg-primary hover:bg-primary-focus text-primary-content"
            onClick={handleOpenNewQard}
          >
            New Qard
          </button>
        </div>
      </div>
      {openNewQard && (
        <Modal open={openNewQard} onClose={handleOpenNewQard}>
          <QardForm onClose={handleOpenNewQard} getQards={getQards} />
        </Modal>
      )}

      <div className="flex flex-col items-center w-full m-auto">
        {loading && <DotLoader />}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="qardsList">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`w-full ${
                  snapshot.isDraggingOver ? 'bg-primary/10' : 'bg-inherit'
                }`}
              >
                {qards?.map((qard: Qard, index: number) => (
                  <QardListItem
                    qard={qard}
                    key={qard.id}
                    getQards={getQards}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {qards?.length === 0 && (
          <div className="p-8 my-10 text-xl rounded-lg bg-primary text-primary-content border-secondary">
            You have no cards yet
          </div>
        )}
      </div>
    </div>
  )
}

export default QardList
