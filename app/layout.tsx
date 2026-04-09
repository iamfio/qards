import './globals.css'

import AuthContext from '@/components/AuthContext'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme) {
                  const parsedTheme = JSON.parse(theme);
                  document.documentElement.setAttribute('data-theme', parsedTheme);
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <AuthContext session={session}>
        <body className={urbanist.className}>
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
