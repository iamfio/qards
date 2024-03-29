import { prisma } from '@/lib/globalPrisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ProfileEditForm from './ProfileEditForm'

export const metadata = {
  title: 'Qards | Edit Profile',
}

const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  })
}

const Profile = async () => {
  const session = await getServerSession(authOptions)
  const user = await getUserById(session?.user?.id as string)

  if (!session || !user) {
    redirect('/')
  }

  return (
    <div>
      <div className="w-full my-8">
        <ProfileEditForm user={user} />
      </div>
    </div>
  )
}

export default Profile
