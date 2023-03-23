import UserNotFound from '@/components/ui/UserNotFound'
import { prisma } from '@/lib/globalPrisma'
import { User } from '@prisma/client'
import QardList from '@/components/qard/QardList'

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

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user) {
    return <UserNotFound />
  }

  return (
    <div className="my-8 ">
       <QardList />
    </div>
  )
}

export default UserPage
