import { SvelteKitAuth } from "@auth/sveltekit"
import MicrosoftEntraID from "@auth/sveltekit/providers/microsoft-entra-id"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [MicrosoftEntraID],
})