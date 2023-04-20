import { Suspense } from 'react'
import type { Metadata } from 'next'

import ProfileCard from '@/components/profile/ProfileCard'
import Qard from '@/components/qard/Qard'
import UserNotFound from '@/components/ui/UserNotFound'
import { prisma } from '@/lib/globalPrisma'
import { User } from '@prisma/client'

import Loading from './loading'

type UserPageProps = {
  params: { username: string }
}

const getUserByUsername = async (username: User['username']) => {
  if (!username) {
    return null
  }

  return await prisma.user.findUnique({
    where: { username },
    include: {
      qards: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  })
}

export const generateMetadata = async ({
  params,
}: UserPageProps): Promise<Metadata> => {
  const user = await getUserByUsername(params.username)
  return { title: `${user?.name}'s Qards` }
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user) {
    return <UserNotFound />
  }

  return (
    <div className="my-8">
      <div className="snap-mandatory snap-always snap-y">
        <div className="snap-start">
          <Suspense fallback={<Loading />}>
            <ProfileCard user={user} />
          </Suspense>

          <div className="divider my-14"></div>

          <Suspense fallback={<Loading />}>
            {user?.qards.map((qard) => (
              <Qard
                accountLink={qard.accountLink}
                accountName={qard.accountName}
                id={qard.id}
                key={qard.id}
              />
            ))}
          </Suspense>

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

export default UserPage
