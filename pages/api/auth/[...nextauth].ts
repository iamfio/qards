import prisma from '@/lib/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions, Session } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: any }) {
      session.user.id = user.id
      return session
    },
  },
}

export default NextAuth(authOptions)
