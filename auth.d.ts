import { DefaultSession } from "next-auth"

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string | null // NOTE: made "id" optional (?) and nullable (null) so that it matches types with ones already existing in DefaultSession
    } & DefaultSession['user']
  }
}
