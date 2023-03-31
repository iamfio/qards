'use client'

import { getURL } from '@/lib/utils'
import { Qard, User } from '@prisma/client'
import { useQRCode } from 'next-qrcode'

type Props = {
  user: (User & { qards: Qard[] }) | null
}

const ProfileCard = ({ user }: Props) => {
  const { Canvas } = useQRCode()

  return (
    <div className="shadow-xl card w-[350px] bg-base-100">
      <figure>
        <img src={user?.image || ''} alt={user?.name || ''} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.name}</h2>

        {user?.jobRole && (
          <h2 className="mt-[-0.4rem] mb-2 text-sm font-mono">
            {user?.jobRole}
          </h2>
        )}

        {user?.email && (
          <div>
            <div className="mt-2 text-sm font-bold">E-Mail:</div>{' '}
            <span className="text-lg">{user?.email}</span>
          </div>
        )}

        {user?.company && (
          <div>
            <div className="mt-2 text-sm font-bold">Company:</div>{' '}
            <span className="text-lg">{user?.company}</span>
          </div>
        )}

        <div className="divider"></div>

        <div className="self-center">
          <Canvas
            text={getURL(`/${user?.username}`)}
            options={{
              level: 'H',
              margin: 0,
              scale: 3,
              width: 200,
              color: {
                light: '#fff',
                dark: '#282a36',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
