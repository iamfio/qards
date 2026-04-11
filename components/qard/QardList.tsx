'use client'

import { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { Qard } from '@prisma/client'

import DotLoader from '@/components/loader/DotLoader'
import QardForm from '@/components/qard/QardForm'
import QardListItem from '@/components/qard/QardListItem'
import Modal from '@/components/ui/modal/Modal'

export default function QardList() {
  const [qards, setQards] = useState<Qard[]>()
  const [openNewQard, setOpenNewQard] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleOpenNewQard = () => setOpenNewQard((prev) => !prev)

  const getQards = useCallback(async (showLoader = true) => {
    if (showLoader) {
      setLoading(true)
    }

    try {
      const response = await fetch('/api/qard')
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error(errorData.message || 'Failed to fetch Qards')
      }

      const data = await response.json()
      setQards(data.qards) // Assuming the API returns { qards: [...] }
    } catch (error) {
      console.error('Error fetching Qards:', error)
      // TODO: show a user-friendly error message
    } finally {
      if (showLoader) {
        setLoading(false)
      }
    }
  }, [])

  const reorder = (
    qardsOrder: Qard[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(qardsOrder)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
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
    getQards(true).catch(console.error)
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
          <QardForm onClose={handleOpenNewQard} getQards={() => getQards(false)} />
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
                    getQards={() => getQards(false)}
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
