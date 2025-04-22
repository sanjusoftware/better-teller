import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from "./$types";
import { loadFlash } from 'sveltekit-flash-message/server';

export const load: LayoutServerLoad = loadFlash(async ({locals, url, cookies}) => {
	const session = await locals.auth()
	if (!session?.user) {
		redirect(303, `/signin?redirectTo=${url.pathname}`);
	}	

	return {		
		session,
		ticket: 'ticket'
	}
});