import './globals.css'

import AuthContext from '@/components/AuthContext'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import ThemeProvider from '@/components/theme/ThemeProvider'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Qards</title>
      </head>
      <body className={urbanist.className}> {/* <body> tag must be directly rendered here */}
        <AuthContext session={session}>
          <ThemeProvider>
            <Navbar />
            <div className="flex flex-col items-center justify-center mx-8 sm:mx-4">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  )
}
