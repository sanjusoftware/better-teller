import { redirect } from '@sveltejs/kit';
import Activities from "$lib/data/activities.json"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({locals, url}) => {
	const session = await locals.auth()
	if (!session) {
		redirect(303, `/signin?redirectTo=${url.pathname}`);
	}
	console.log(session.user);
	return {
		session,
		Activities
	}
}