import { redirect } from '@sveltejs/kit';
import Activities from "$lib/data/activities.json"

export function load({ cookies, url }) {
	if (!cookies.get('logged_in')) {
		redirect(303, `/login?redirectTo=${url.pathname}`);
	}
	return {
		loggedIn: true,
        Activities: Activities
    }
}