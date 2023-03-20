'use client'

import { capitalize } from '@/lib/utils'
import { useQRCode } from 'next-qrcode'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

type QardProps = {
  id?: string
  accountName: string
  accountLink: string
}

const Qard = ({ id, accountName, accountLink }: QardProps) => {
  const { Canvas } = useQRCode()

  return (
    <div className="my-4">
      <div className="shadow-md card w-[350px] bg-base-100 ">
        <figure className="px-10 pt-10 ">
          <Canvas
            text={accountLink}
            options={{
              level: 'H',
              margin: 0,
              scale: 4,
              width: 320,
              color: {
                dark: '#fff',
                light: '#282a36',
              },
            }}
          />
        </figure>

        <div className="items-center text-center card-body">
          <div className="items-center text-center card-body">
            <h2 className="text-4xl card-title text-secondary hover:underline">
              <a href={accountLink}>{capitalize(accountName)}</a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Qard
