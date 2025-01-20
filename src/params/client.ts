import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('retail' | 'sme' | 'corporate') => {
	return param === 'retail' || param === 'sme' || param === 'corporate';
}) satisfies ParamMatcher;