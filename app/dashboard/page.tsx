import QardList from '@/components/qard/QardList'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  if (!session.user.username) {
    redirect('/dashboard/profile/edit')
  }

  return (
    <div>
      <div className="w-full">
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

        <QardList />
      </div>
    </div>
  )
}

export default Dashboard
