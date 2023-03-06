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
      <div className="text-center">
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
          <div className="flex justify-between">
            <div className="my-2 mx-4">
              <Link href="/dashboard/profile/edit">Edit Profile</Link>
            </div>
            <div className="my-2 mx-4">
              <Link href="#">New Qard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
