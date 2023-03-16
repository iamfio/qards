import QardList from '@/components/qard/QardList'
import { prisma } from '@/lib/globalPrisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  // On this state of project the Qards, created by SESSION User can be retrieved and listed.
  // TODO: Show cards by User's username!
  if (!session) {
    redirect('/')
  }

  const userQards = await prisma.user.findUnique({
    where: { id: session?.user.id as string },
    select: { qards: true },
  })

  return (
    <div>
      <div className="w-full ">
        <div className="my-6 text-center">
          <h1 className="text-xl font-semibold">
            Hello{' '}
            <Link
              href="/dashboard/profile"
              className="underline underline-offset-2"
            >
              {session?.user.name}
            </Link>{' '}
            👋
          </h1>

          <div className="divider"></div>
        </div>

        {userQards && <QardList qards={userQards.qards} />}
      </div>
    </div>
  )
}

export default Dashboard
