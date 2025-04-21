import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals, url, cookies}) => {
	const session = await locals.auth()
	if (!session?.user) {
		redirect(303, `/signin?redirectTo=${url.pathname}`);
	}	

	return {		
		session,
		ticket: 'ticket'
	}
}