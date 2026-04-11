import { prisma } from '@/lib/globalPrisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'

async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  })
}

export default async function Profile() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  const user = await getUserById(session?.user?.id as string)

  return (
    <>
      <div className="shadow-xl card w-[300px] bg-base-100 my-8">
        <figure>
          {user?.image && (
             <Image src={user.image} alt={user?.name || 'Profile Picture'} width={300} height={300} unoptimized />
          )}
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
