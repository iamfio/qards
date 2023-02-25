import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Inter } from '@next/font/google'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

const Home = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="text-center">
      <div>
        <p>this is app body</p>
      </div>
    </div>
  )
}

export default Home
