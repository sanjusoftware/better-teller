import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    // locals.lang is set by hooks.server.ts
    const currentLocale = locals.lang || 'en';
    return { locale: currentLocale };
};
