import { env } from "$env/dynamic/private"
import { SvelteKitAuth } from "@auth/sveltekit"
import MicrosoftEntraID from "@auth/sveltekit/providers/microsoft-entra-id"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [MicrosoftEntraID({
    issuer: env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    clientId: env.AUTH_MICROSOFT_ENTRA_ID_ID,
    clientSecret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
    profile(profile) {
      console.log('profile: ', profile, profile.roles)
      return { roles: profile.roles ?? "unknown", ...profile }
    }
  })],
  callbacks: {
    session({ session, token }) {
      if (token) {
        console.log('token is: ', token)
        console.log('roles are: ', token.roles)

        session.user.userId = token.sub as string
        session.user.roles = token.roles as string[]
      }
      return session
    }
  }
})