import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { prisma } from '@/lib/globalPrisma'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import ProfileCard from '@/components/profile/ProfileCard'
import Qard from '@/components/qard/Qard'
import UserNotFound from '@/components/ui/UserNotFound'

export const metadata = {
  title: 'Qards | Dashboard',
}

const getUserByUsername = async (username: User['username']) => {
  console.log(username)
  if (!username) {
    return null
  }

  return await prisma.user.findUnique({
    where: { username },
    include: { qards: true },
  })
}

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user.username) {
    return <UserNotFound />
  }
  const user = await getUserByUsername(session.user.username)

  if (!user) {
    return <UserNotFound />
  }

  // this was here and probably should stay here
  if (!session) {
    redirect('/')
  }
  // this was here too
  if (!session.user.username) {
    redirect('/dashboard/profile/edit')
  }

  return (
      <div className="my-8">
      <div className="text-center">
          <h1 className="text-xl font-semibold">
            Hello{' '}
            <Link
              href={encodeURIComponent(session.user.username)}
              className="underline underline-offset-2"
            >
              {session.user.name}
            </Link>{' '}
             👋
          </h1>

          <div className="divider"></div>
        </div>

        <div className="snap-mandatory snap-always snap-y">
          <div className="snap-start">
            <ProfileCard user={user} />
            {user?.qards.map((qard) => (
              <Qard
                accountLink={qard.accountLink ?? ''}
                accountName={qard.accountName ?? ''}
                id={qard.id}
                key={qard.id}
              />
            ))}

            {user.qards.length === 0 && (
              <div className="h-24 mt-12 shadow-lg alert">
                <div className="my-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="flex-shrink-0 w-6 h-6 stroke-info"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>You have no cards yet.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}

export default Dashboard
