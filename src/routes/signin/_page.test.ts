import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { writable } from 'svelte/store';

import SigninPage from './+page.svelte'; // Adjust path as necessary

// Mock svelte-i18n
const mockSigninLocale = writable('en');
const mockSigninTranslate = (key: string, options?: any) => {
    // Provide mock translations for keys used in SigninPage.svelte
    if (key === 'login.cardTitle') return 'Mocked Sign In Portal';
    if (key === 'login.dskIdButton') return 'Mocked DSK ID Login';
    if (key === 'login.troubleSigningIn') return 'Mocked Trouble Signing In?';
    if (key === 'login.contactSupport') return 'Mocked Contact Support';
    // Fallback for any other keys
    return key;
};
const readableMockSigninTranslate = writable(mockSigninTranslate);

vi.mock('svelte-i18n', () => ({
    _: readableMockSigninTranslate,
    locale: mockSigninLocale,
    // Mock other exports if SigninPage or its children use them
    t: readableMockSigninTranslate,
    init: vi.fn(),
    register: vi.fn(),
    waitLocale: vi.fn().mockResolvedValue(undefined),
    getLocaleFromNavigator: vi.fn(() => 'en')
}));

// Mock $app/forms for page store if needed by any child component, though SigninPage itself doesn't seem to use it directly for translations
vi.mock('$app/forms', () => ({
    enhance: vi.fn(),
}));

// Mock $app/stores for page store if needed
vi.mock('$app/stores', () => ({
    page: writable({ data: {} }), // Basic mock for $page.data
}));

// Mock $app/navigation for goto, beforeNavigate, afterNavigate if needed
vi.mock('$app/navigation', () => ({
    goto: vi.fn(),
    beforeNavigate: vi.fn(),
    afterNavigate: vi.fn()
}));


describe('SigninPage.svelte', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        mockSigninLocale.set('en'); // Reset locale
    });

    it('renders localized text elements', () => {
        // Props for MetaTag if SigninPage requires them, though they are constants in the script
        const props = {
            data: {} // Mock $page.data if needed by the component structure for translations
        };
        render(SigninPage, { props });

        expect(screen.getByText('Mocked Sign In Portal')).toBeInTheDocument();
        expect(screen.getByText('Mocked DSK ID Login')).toBeInTheDocument();
        expect(screen.getByText('Mocked Trouble Signing In?')).toBeInTheDocument();
        expect(screen.getByText('Mocked Contact Support')).toBeInTheDocument();
    });

    it('reacts to locale changes (conceptual test)', async () => {
        render(SigninPage, { props: { data: {} } });

        // Initially, 'en' translations are shown
        expect(screen.getByText('Mocked Sign In Portal')).toBeInTheDocument();

        // Change locale and update the mock translation function for 'login.cardTitle'
        readableMockSigninTranslate.set((key: string, options?: any) => {
            if (key === 'login.cardTitle') return 'BG Mocked Sign In Portal';
            return key;
        });
        mockSigninLocale.set('bg');
        await Promise.resolve(); // Wait for Svelte's reactivity

        // Check if the text updated (this requires the component to re-render based on store changes)
        // Note: The way $_ works, it subscribes to the store that contains the dictionary.
        // Changing the mock function inside readableMockSigninTranslate and then setting locale
        // should trigger reactivity if the $_ implementation correctly re-evaluates.
        expect(screen.getByText('BG Mocked Sign In Portal')).toBeInTheDocument();
    });
});
