import { SvelteKitAuth } from "@auth/sveltekit"
import MicrosoftEntraID from "@auth/sveltekit/providers/microsoft-entra-id"
import { env } from "$env/dynamic/private"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [MicrosoftEntraID],
})