import AuthButton from '@/components/ui/AuthButton'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <div>
      <h1>Welcome to Qards App</h1>
      <div>
        <AuthButton />
      </div>
    </div>
  )
}

export default Home
