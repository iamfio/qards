import ProfileCard from '@/components/profile/ProfileCard'
import Qard from '@/components/qard/Qard'
import { prisma } from '@/lib/globalPrisma'
import { User } from '@prisma/client'

type UserPageProps = {
  params: { username: string }
}

const getUserByUsername = async (username: User['username']) => {
  if (!username) {
    return null
  }

  return await prisma.user.findUnique({
    where: { username },
    include: { qards: true },
  })
}

export const generateMetadata = async ({ params }: UserPageProps) => {
  return {
    title: `${params.username}'s Qards`,
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  return (
    <div className='my-8'>
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
        </div>
      </div>
    </div>
  )
}

export default UserPage
