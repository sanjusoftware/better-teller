import { SvelteKitAuth } from "@auth/sveltekit"
import MicrosoftEntraID from "@auth/sveltekit/providers/microsoft-entra-id"
import { env } from "$env/dynamic/private"

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [MicrosoftEntraID({
    clientId: env.AUTH_AZURE_AD_ID,  // Your Microsoft Entra ID client ID
    clientSecret: env.AUTH_AZURE_AD_SECRET,  // Your Microsoft Entra ID client secret 
  })],
})