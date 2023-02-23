import { Inter } from '@next/font/google'
import { NextPage } from 'next'
import { getSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  return (
    <div className="text-center">
      <h1>Welcome</h1>
      <div>
        <p>this is app body</p>
      </div>
    </div>
  )
}

export default Home
