import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('casa' | 'card' | 'loan' ) => {
	return param === 'casa' || param === 'card' || param === 'loan';
}) satisfies ParamMatcher;