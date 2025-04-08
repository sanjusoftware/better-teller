import type { ParamMatcher } from '@sveltejs/kit';
let productTypes = ['casa', 'card', 'loan', 'deposit', 'insurance', 'investment', 'all']
export const match = ((param: string): param is ('casa' | 'card' | 'loan' | 'deposit' | 'insurance' | 'investment') => {
	return productTypes.includes(param)
}) satisfies ParamMatcher;