import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import React from 'react'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <div className="text-center">
        <h1>Hello {session?.user?.name}</h1>
        <p>You have no cards.</p>
        <div className='my-6'>
          <button className="btn btn-primary">Create New</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
