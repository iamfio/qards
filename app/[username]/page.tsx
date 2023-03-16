import ProfileCard from '@/components/profile/ProfileCard'
import Qard from '@/components/qard/Qard'
import { prisma } from '@/lib/globalPrisma'
import { redirect } from 'next/navigation'

type UserPageProps = {
  params: { username: string }
}

const getUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
    include: { qards: true },
  })
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user) {
    redirect('/')
  }

  return (
    <div>
      <div className="snap-mandatory snap-always snap-y">
        <div className="snap-start">
          <ProfileCard user={user} />
          {user.qards.map((qard) => (
            <Qard
              accountLink={qard.accountLink ?? ''}
              accountName={qard.accountName ?? ''}
              id={qard.id}
              key={qard.id}
              isPrivate={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserPage
