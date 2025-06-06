import { browser } from '$app/environment';
import { setLocale as setI18nLocale } from '$lib/i18n'; // Renamed to avoid conflict with svelte-i18n's locale store
import { locale as svelteI18nLocaleStore, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
    // data.locale comes from +layout.server.ts (which gets it from hooks.server.ts)
    const initialLoadLocale = data.locale || 'en';

    if (browser) {
        // On client, prioritize localStorage, then server-provided, then navigator
        const savedLocale = localStorage.getItem('locale');
        const finalLocale = savedLocale || initialLoadLocale || window.navigator.language.split('-')[0];
        setI18nLocale(finalLocale); // Use our custom setLocale to also save to localStorage
    } else {
        // On server, `data.locale` is the source of truth from hooks/layout.server.ts
        // `svelte-i18n`'s `locale.set` is called here to ensure server-rendered content uses this locale.
        // Our custom `setI18nLocale` also calls `currentLocale.set` from `svelte-i18n`.
        setI18nLocale(initialLoadLocale);
    }

    await waitLocale(); // Wait for the initial locale's messages to load

    // Pass the locale through, so it's available in $page.data.locale in components/layouts
    return { locale: initialLoadLocale };
};
