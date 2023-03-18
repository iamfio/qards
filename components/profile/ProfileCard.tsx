'use client'

import { Qard, User } from '@prisma/client'
import { useQRCode } from 'next-qrcode'
import Link from 'next/link'

type Props = {
  user: (User & { qards: Qard[] }) | null
}

const ProfileCard = ({ user }: Props) => {
  const { Canvas } = useQRCode()

  // TODO: replace windw.location.href the right way

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
            text={window.location.href}
            options={{
              level: 'H',
              margin: 0,
              scale: 3,
              width: 200,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
