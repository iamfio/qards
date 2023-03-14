import { prisma } from '@/lib/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { randomBytes, randomUUID } from 'crypto'
import NextAuth, { AuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  secret: process.env.JWT_SIGNING_PRIVATE_KEY,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,
    maxAge: 60 * 60 * 24 * 30,
  },
  session: {
    // strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 1 Week
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex')
    },
  },
  callbacks: {
    async session({
      session,
      user,
      token,
    }: {
      session: Session
      user: any
      token: JWT
    }) {
      session.user.id = user.id
      session.user.username = user.username
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return {
        token,
        user,
        isNewUser,
      }
    },
  },
}

export default NextAuth(authOptions)
