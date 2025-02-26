import { DefaultSession, DefaultUser} from "@auth/sveltekit"

declare module "@auth/sveltekit" {
    interface Session {
      user: {
        userId: string
        roles: string[] | undefined | null
      } & DefaultSession["user"]
    }
  }