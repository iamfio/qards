'use client'
import { capitalize } from '@/lib/utils'
import { Session } from '@prisma/client'
import { useSession } from 'next-auth/react'

import { useQRCode } from 'next-qrcode'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

type QardProps = {
  id?: string
  accountName: string
  accountLink: string
  isPrivate: boolean
  // userId: Session['userId']
}

const Qard = ({ id, accountName, accountLink, isPrivate }: QardProps) => {
  const { Canvas } = useQRCode()

  return (
    <div className="my-4">
      <div className="shadow-md card w-[350px] bg-base-100 ">
        <figure className="px-10 pt-10 ">
          <Canvas
            text={accountLink}
            options={{
              level: 'H',
              margin: 1,
              scale: 4,
              width: 320,
              color: {
                dark: '#1e1e2e',
                light: '#fff',
              },
            }}
          />
        </figure>

        <div className="items-center text-center card-body">
          <div className="items-center text-center card-body">
            <h2 className="text-4xl card-title">{capitalize(accountName)}</h2>
          </div>

          {isPrivate && (
            <div className="card-actions">
              <button className="btn btn-md btn-wide btn-primary btn-sm btn-square btn-outline">
                <AiOutlineEdit className="text-xl" />
              </button>

              <button className="btn btn-md btn-wide btn-error btn-sm btn-square btn-outline">
                <AiOutlineDelete className="text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Qard
