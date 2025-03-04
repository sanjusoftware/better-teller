import { env } from "$env/dynamic/private"
import { SvelteKitAuth } from "@auth/sveltekit"
import MicrosoftEntraID from "@auth/sveltekit/providers/microsoft-entra-id"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [MicrosoftEntraID({
    issuer: env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    clientId: env.AUTH_MICROSOFT_ENTRA_ID_ID,
    clientSecret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
    profile(profile) {
      return { ...profile, roles: profile.roles ?? "unknown", email: profile.email ?? profile.preferred_username, picture: profile.picture ?? "" }  
    }
  })],
  callbacks: {
    jwt({ token, user }) {
      // ignore the typescript error here 
      // On sign-in, the role property is exposed from the profile callback on the user object
      // https://authjs.dev/guides/role-based-access-control?framework=sveltekit
      if (user) token.roles = user.roles
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.userId = token.sub as string
        session.user.roles = token.roles as string[]
      }
      console.log('user is: ', session.user)
      return session
    }
  }
})