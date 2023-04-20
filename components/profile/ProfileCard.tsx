'use client'

import { getURL } from '@/lib/utils'
import { Qard, User } from '@prisma/client'
import { useQRCode } from 'next-qrcode'
import { useReadLocalStorage } from 'usehooks-ts'

type ProfileCardProps = {
  user: (User & { qards: Qard[] }) | null
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { Canvas } = useQRCode()
  const theme = useReadLocalStorage('theme')

  return (
    <div className="card w-[350px] bg-base-100 shadow-xl">
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
              margin: 1,
              scale: 3,
              width: 200,
              color: {
                light: '#fff',
                dark: theme === 'night' ? '#2a303c' : '#282a36',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
