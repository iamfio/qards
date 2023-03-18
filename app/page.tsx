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
      <div className="px-4 py-3">
        <div className="mb-10">
          <h1 className="mb-8 text-5xl">QaRds App</h1>
          <h3 className="my-3 text-lg font-light ">Show and share</h3>
          <p className="my-3 text-lg font-medium w-96 ">
            Makes the management of your QR Businesscard for your social
            profiles or projects realy easy. Just create new Qard and let your
            partner scan it.
          </p>
          <p className="my-3 text-lg font-medium w-96 ">
            With just 3 easy steps!
          </p>
        </div>

        <ul className="mb-10 steps steps-vertical">
          <li className="step step-primary">Sign Up</li>
          <li className="step step-secondary">Create first Qard</li>
          <li className="step step-accent">Enjoy!</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
