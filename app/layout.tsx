import './globals.css'

import AuthContext from '@/components/AuthContext'
import Navbar from '@/components/ui/Navbar'
import { Session } from 'next-auth'
import { headers } from 'next/headers'

const getSession = async (cookie: string): Promise<Session> => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  })

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession(headers().get('cookie') ?? '')
  const user = session ? session.user : undefined

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
            <Navbar user={user} />
            <div className="flex flex-col items-center justify-center mx-2 my-4 ">
              {children}
            </div>
          </>
        </AuthContext>
      </body>
    </html>
  )
}
