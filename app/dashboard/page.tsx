import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <div className="text-center">
        <div className="my-6">
          <div>{session?.user.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
