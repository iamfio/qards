import { prisma } from '@/lib/globalPrisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import EditProfile from './edit/ProfileEditForm'
import Link from 'next/link'

const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  })
}

const Profile = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  const user = await getUserById(session?.user?.id as string)

  return (
    <div>
      <div>
        <div className="shadow-xl card w-96 bg-base-100">
          <figure>
            <img src={user?.image || ''} alt={user?.name || ''} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{user?.name}</h2>

            {user?.jobRole && <h2 className="">{user?.jobRole}</h2>}

            {user?.email && (
              <div>
                <div className="mt-2 text-sm">E-Mail:</div>{' '}
                <span className="text-lg">{user?.email}</span>
              </div>
            )}

            {user?.username && (
              <div>
                <div className="mt-2 text-sm">Username:</div>{' '}
                <span className="text-lg">{user?.username}</span>
              </div>
            )}

            {user?.company && (
              <div>
                <div className="mt-2 text-sm">Company:</div>{' '}
                <span className="text-lg">{user?.company}</span>
              </div>
            )}

            <div className="justify-end card-actions">
              {session?.user && (
                <Link
                  href="/dashboard/profile/edit"
                  className="btn btn-primary btn-outline"
                >
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
