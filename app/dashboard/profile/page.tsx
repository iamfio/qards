import { prisma } from '@/lib/globalPrisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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
    <>
      <div className="shadow-xl card w-[300px] bg-base-100 my-8">
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
    </>
  )
}

export default Profile
