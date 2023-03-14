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
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContext session={session}>
          <>
            <Navbar />
            <div className="flex flex-col items-center justify-center mx-2 my-4 ">
              {children}
            </div>
            <Footer />
          </>
        </AuthContext>
      </body>
    </html>
  )
}
