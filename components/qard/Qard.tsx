'use client'

import { useReadLocalStorage } from 'usehooks-ts'
import { useQRCode } from 'next-qrcode'
import { capitalize } from '@/lib/utils'

import IconGeneric from '@/components/ui/icons/IconGeneric'

type QardProps = {
  id?: string
  accountName: string
  accountLink: string
}

const Qard: React.FC<QardProps> = ({ accountName, accountLink }) => {
  const { Canvas } = useQRCode()
  const theme = useReadLocalStorage('theme')

  return (
    <div className="my-6">
      <div className="shadow-xl card w-[350px] bg-base-100 ">
        <figure className="px-10 pt-10">
          <Canvas
            text={accountLink}
            options={{
              level: 'H',
              margin: 1,
              scale: 4,
              width: 320,
              color: {
                dark: theme === 'night' ? '#2a303c' : '#282a36',
                light: '#fff',
              },
            }}
          />
        </figure>

        <div className="items-center text-center card-body">
          <div className="w-24 mb-2">
            <IconGeneric name={accountLink} />
          </div>
          <h2 className="mb-3 text-5xl card-title">
            <a href={accountLink}>{capitalize(accountName)}</a>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Qard
