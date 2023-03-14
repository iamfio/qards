'use client'

import QardForm from '@/components/qard/QardForm'
import { capitalize } from '@/lib/utils'
import { Qard } from '@prisma/client'
import { SetStateAction, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import Modal from '../modal/Modal'
import IconGeneric from '../ui/icons/IconGeneric'

type QardListItemProps = {
  id: Qard['id']
  accountName: Qard['accountName']
  accountLink: Qard['accountLink']
}

const QardListItem = ({ id, accountName, accountLink }: QardListItemProps) => {
  const [openEditQard, setOpenEditQard] = useState<boolean>(false)

  const handleOpenEditQard = () => setOpenEditQard((prev) => !prev)

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
            />
          </Modal>
        )}

        <div className="mr-4 avatar placeholder">
          <IconGeneric name={capitalize(accountName?.[0]!)} />
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
            <button className="btn btn-sm btn-error btn-square btn-outline">
              <AiOutlineDelete className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QardListItem
