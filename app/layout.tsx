import './globals.css'

import AuthContext from '@/components/AuthContext'
import Navbar from '@/components/ui/Navbar'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Footer from '@/components/ui/Footer'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head />
      <AuthContext session={session}>
        <body>
          <Navbar />
          <div className="flex flex-col items-center justify-center mx-8 sm:mx-4">
            {children}
          </div>
          <Footer />
        </body>
      </AuthContext>
    </html>
  )
}
