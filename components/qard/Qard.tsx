'use client'

import { capitalize } from '@/lib/utils'
import { useQRCode } from 'next-qrcode'

import IconGeneric from '@/components/ui/icons/IconGeneric'

type QardProps = {
  id?: string
  accountName: string
  accountLink: string
}

const Qard = ({ accountName, accountLink }: QardProps) => {
  const { Canvas } = useQRCode()

  return (
    <div className="my-6">
      <div className="shadow-md shadow-slate-300 card w-[350px] bg-base-100 ">
        <figure className="px-10 pt-10 ">
          <Canvas
            text={accountLink}
            options={{
              level: 'H',
              margin: 0,
              scale: 4,
              width: 320,
              color: {
                dark: '#282a36',
                light: '#fff',
              },
            }}
          />
        </figure>

        <div className="items-center text-center card-body">
          <div className="w-24 mb-2">
            <IconGeneric name={accountLink} />
          </div>
          <h2 className="text-4xl underline card-title text-primary hover:underline">
            <a href={accountLink}>{capitalize(accountName)}</a>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Qard
