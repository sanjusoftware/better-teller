import { json } from '@sveltejs/kit';

export function GET() {
	const number = Math.ceil(Math.random() * 10000);
	return json(number);
}
