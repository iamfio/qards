import { prisma } from '@/lib/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { randomBytes, randomUUID } from 'crypto'
import NextAuth, { type AuthOptions } from 'next-auth'

import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import type { User } from '@prisma/client'

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
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id
        session.user.username = (user as User).username
      }
      return session
    },
    async jwt({ token, user, trigger }) {
      return {
        token,
        user,
        trigger,
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
