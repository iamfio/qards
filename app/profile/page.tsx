import { prisma } from '@/lib/globalPrisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  })
}

const updateUser = async (userId: string, userData: User) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...userData,
    },
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
      <h1>{user?.name}</h1>
      <div>
        <button className='btn btn-primary btn-sm'>Edit Profile</button>
      </div>
    </div>
  )
}

export default Profile
