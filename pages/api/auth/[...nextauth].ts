import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions, Session } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import prisma from '@/lib/prismadb'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    }),
  ],
}

export default NextAuth(authOptions)
