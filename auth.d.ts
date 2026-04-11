import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      username?: string | null;
    } & DefaultSession["user"];
  }
}
