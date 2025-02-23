import { signIn } from "../../auth";
import type { Actions } from "./$types"
import type { PageServerLoad } from "./$types"
import { redirect } from '@sveltejs/kit';

export const actions: Actions = { default: signIn }
export const load: PageServerLoad = async ({ locals}) => {
    const session = await locals.auth()
    if (session) {
        redirect(303, "/dashboard");
    }
}