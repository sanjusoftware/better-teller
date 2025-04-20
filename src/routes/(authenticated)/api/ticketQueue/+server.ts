import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
    // Simulate an API call to fetch the next ticket
	const random = Math.random() * 10000;
	return new Response(String(random));
};