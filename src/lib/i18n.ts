import { register, init, getLocaleFromNavigator, locale as currentLocale } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('bg', () => import('./locales/bg.json'));
register('hu', () => import('./locales/hu.json'));

export const supportedLocales = ['en', 'bg', 'hu'];

// Determine initial locale:
// 1. Check localStorage (if a user preference was saved)
// 2. Fallback to navigator language
// 3. Fallback to 'en'
let initialLocale;
if (typeof window !== 'undefined') {
  initialLocale = window.localStorage.getItem('locale') || getLocaleFromNavigator();
} else {
  initialLocale = getLocaleFromNavigator(); // For SSR, though navigator might not be best here. Usually handled in hooks.
}
initialLocale = initialLocale || 'en';


init({
  fallbackLocale: 'en',
  initialLocale: initialLocale,
});

// To make currentLocale writable and usable for setting locale from localStorage or user input
export const setLocale = (newLocale: string) => {
  if (supportedLocales.includes(newLocale)) {
    currentLocale.set(newLocale);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('locale', newLocale);
    }
  } else {
    console.warn(`Attempted to set unsupported locale: ${newLocale}`);
  }
};

// Export currentLocale directly if needed, or rely on svelte-i18n's own stores.
// The 'locale' store from svelte-i18n is already exported by the library.
// export { currentLocale as localeStore }; // Example of re-exporting with a different name

// For SSR, locale might be better determined in hooks.server.ts from headers.
// The init call here primarily sets up the client-side.
// For SvelteKit, ensuring this runs early, e.g. in a root +layout.ts, is key.
