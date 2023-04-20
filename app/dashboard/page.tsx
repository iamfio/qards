import QardList from '@/components/qard/QardList'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import Loading from './loading'

export const metadata = {
  title: 'Qards | Dashboard',
}

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  if (!session.user.username) {
    redirect('/dashboard/profile/edit')
  }

  return (
    <>
      <div className="w-full my-8 sm:w-96">
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

        <Suspense fallback={<Loading />}>
          <QardList />
        </Suspense>
      </div>
    </>
  )
}

export default Dashboard
