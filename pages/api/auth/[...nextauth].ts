import { prisma } from '@/lib/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { randomBytes, randomUUID } from 'crypto'
import NextAuth, { AuthOptions, getServerSession, Session } from 'next-auth'
import { type GetServerSidePropsContext } from 'next'

import { JWT } from 'next-auth/jwt'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  secret: process.env.JWT_SIGNING_PRIVATE_KEY,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
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

// Gives session object back to user without have to pass authOptions again
// Works on API Side
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
