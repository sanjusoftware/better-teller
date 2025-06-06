import { render, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { writable, get } from 'svelte/store'; // Import get to read store value

import LanguageSwitcher from './LanguageSwitcher.svelte';

// Mock svelte-i18n
const mockSvelteI18nLocale = writable('en'); // Writable store for currentLocale
const mockTranslate = (key: string, options?: any) => {
    if (key === 'languages.en') return 'English';
    if (key === 'languages.bg') return 'Bulgarian';
    if (key === 'languages.hu') return 'Hungarian';
    return key; // Fallback
};
const readableMockTranslate = writable(mockTranslate); // Using writable to allow $ syntax

vi.mock('svelte-i18n', () => ({
    _: readableMockTranslate,
    locale: mockSvelteI18nLocale, // This is the store components subscribe to for current language
    // Mock other exports if needed by any component, though LanguageSwitcher mostly uses _ and locale
    t: readableMockTranslate,
    init: vi.fn(),
    register: vi.fn(),
    waitLocale: vi.fn().mockResolvedValue(undefined),
    getLocaleFromNavigator: vi.fn(() => 'en')
}));

// Mock $lib/i18n.ts
const mockSetLocale = vi.fn();
vi.mock('$lib/i18n', () => ({
    supportedLocales: ['en', 'bg', 'hu'],
    setLocale: mockSetLocale,
}));

describe('LanguageSwitcher.svelte', () => {
    beforeEach(() => {
        vi.resetAllMocks(); // Reset mocks before each test
        mockSvelteI18nLocale.set('en'); // Reset locale to 'en' before each test
    });

    it('renders buttons for all supported locales', () => {
        render(LanguageSwitcher);
        const { supportedLocales } = await import('$lib/i18n');

        supportedLocales.forEach(langCode => {
            // Check if button exists by its translated aria-label (or text)
            // The aria-label is set using $_('languages.' + langCode)
            const expectedLabel = mockTranslate('languages.' + langCode);
            expect(screen.getByRole('button', { name: expectedLabel })).toBeInTheDocument();
        });
    });

    it('displays translated language names on buttons', () => {
        render(LanguageSwitcher);
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('Bulgarian')).toBeInTheDocument();
        expect(screen.getByText('Hungarian')).toBeInTheDocument();
    });

    it('calls setLocale with the correct language code when a button is clicked', async () => {
        render(LanguageSwitcher);

        const bulgarianButton = screen.getByText('Bulgarian');
        await fireEvent.click(bulgarianButton);
        expect(mockSetLocale).toHaveBeenCalledWith('bg');

        const hungarianButton = screen.getByText('Hungarian');
        await fireEvent.click(hungarianButton);
        expect(mockSetLocale).toHaveBeenCalledWith('hu');
    });

    it('applies active class based on current locale', async () => {
        // Set current locale to 'bg' for this test
        mockSvelteI18nLocale.set('bg');

        render(LanguageSwitcher);

        const englishButton = screen.getByText('English');
        const bulgarianButton = screen.getByText('Bulgarian');
        const hungarianButton = screen.getByText('Hungarian');

        // Check classes based on the mocked Tailwind-like classes in the component
        expect(bulgarianButton.classList.contains('active')).toBe(true);
        expect(bulgarianButton.classList.contains('bg-primary-600')).toBe(true); // Example active class

        expect(englishButton.classList.contains('active')).toBe(false);
        expect(englishButton.classList.contains('bg-gray-200')).toBe(true); // Example inactive class

        expect(hungarianButton.classList.contains('active')).toBe(false);
        expect(hungarianButton.classList.contains('bg-gray-200')).toBe(true);
    });

     it('updates active class when locale changes', async () => {
        render(LanguageSwitcher);

        const englishButton = screen.getByText('English');
        const bulgarianButton = screen.getByText('Bulgarian');

        // Initially 'en' is active
        expect(englishButton.classList.contains('active')).toBe(true);
        expect(bulgarianButton.classList.contains('active')).toBe(false);

        // Change locale to 'bg'
        mockSvelteI18nLocale.set('bg');
        await Promise.resolve(); // Wait for Svelte to react to store change

        expect(englishButton.classList.contains('active')).toBe(false);
        expect(bulgarianButton.classList.contains('active')).toBe(true);
    });
});
