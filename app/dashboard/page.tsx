import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <div className="w-full text-center">
        <div className="my-6">
          <h1 className="font-semibold text-xl">
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

          <div className="flex justify-between">
            <div className="my-2 mx-4">
              <Link href="/dashboard/qards/new" className="btn btn-outline btn-primary">
                New Qard
              </Link>
            </div>
            <div className="my-2 mx-4">
              <Link
                href="/dashboard/profile/edit"
                className="btn btn-outline btn-secondary"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
