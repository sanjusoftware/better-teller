import { render, fireEvent, screen, waitFor } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { writable, get } from 'svelte/store';

import LanguageSwitcher from './LanguageSwitcher.svelte';

// --- Mocks ---

// Mock svelte-i18n
const mockSvelteI18nLocale = writable('en');
const mockTranslate = (key: string, options?: any) => {
    if (key === 'languages.en') return 'English';
    if (key === 'languages.bg') return 'Bulgarian';
    if (key === 'languages.hu') return 'Hungarian';
    // For aria-label on the main button
    if (key === 'languages.en' && options?.values === undefined) return 'English'; // Simulating direct key usage for label
    return key;
};
const readableMockTranslate = writable(mockTranslate);

vi.mock('svelte-i18n', () => ({
    _: readableMockTranslate,
    locale: mockSvelteI18nLocale,
    t: readableMockTranslate, // Assuming t is used similarly if at all
    init: vi.fn(),
    register: vi.fn(),
    waitLocale: vi.fn().mockResolvedValue(undefined),
    getLocaleFromNavigator: vi.fn(() => 'en')
}));

// Mock $lib/i18n.ts
const mockSetLocale = vi.fn((lang: string) => {
    // Simulate the actual setLocale behavior of updating the store
    mockSvelteI18nLocale.set(lang);
});
vi.mock('$lib/i18n', () => ({
    supportedLocales: ['en', 'bg', 'hu'],
    setLocale: mockSetLocale,
}));

// Mock Flowbite Svelte Icons (simple stubs that render nothing or a placeholder)
// This prevents errors if the icons have complex internal logic not relevant to the test.
const createIconStub = (name: string) => ({
    render: () => ({ Component: class { static $is_flanker = true; /* Minimal Svelte component structure */ } }),
    name, // For debugging if needed
});

vi.mock('flowbite-svelte-icons', () => ({
    ChevronDownOutline: createIconStub('ChevronDownOutline'),
    GlobeOutline: createIconStub('GlobeOutline'), // Corrected icon mock
}));


// --- Tests ---

describe('LanguageSwitcher.svelte (Dropdown with Flowbite)', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        mockSvelteI18nLocale.set('en'); // Reset locale to 'en' before each test
    });

    it('displays the current language on the main button', () => {
        render(LanguageSwitcher);
        // The button text includes the icon text and the language name.
        // We check for the language name part.
        // Flowbite Button renders a <button type="button">.
        // The text is within a span inside the button.
        const mainButton = screen.getByRole('button'); // Gets the Flowbite Button
        expect(mainButton).toBeInTheDocument();
        expect(mainButton.textContent).toContain('English'); // Based on mockTranslate for 'languages.en'
    });

    it('calls setLocale with "bg" when Bulgarian DropdownItem is clicked', async () => {
        render(LanguageSwitcher);
        const mainButton = screen.getByRole('button'); // Main dropdown trigger

        // Click to open the dropdown.
        // Flowbite's Dropdown might render items elsewhere or manage visibility dynamically.
        // We assume clicking the main button makes DropdownItems available.
        await fireEvent.click(mainButton);

        // Find the DropdownItem for Bulgarian. Flowbite DropdownItems might not be direct 'button' roles
        // but could be 'menuitem' or other interactive elements.
        // We'll look for the text content.
        const bulgarianOption = await screen.findByText(/Bulgarian/); // Find by text, more robust to exact role
        expect(bulgarianOption).toBeInTheDocument();

        await fireEvent.click(bulgarianOption);

        expect(mockSetLocale).toHaveBeenCalledWith('bg');
    });

    it('main button text updates when locale changes via setLocale mock', async () => {
        render(LanguageSwitcher);

        // Initial state
        const mainButton = screen.getByRole('button');
        expect(mainButton.textContent).toContain('English');

        // Simulate locale change by calling our mocked setLocale, which updates mockSvelteI18nLocale
        mockSetLocale('hu');
        // mockSvelteI18nLocale.set('hu'); // This is done by mockSetLocale now

        // Wait for Svelte's reactivity and DOM update
        await waitFor(() => {
            expect(mainButton.textContent).toContain('Hungarian');
        });
    });

    it('dropdown items display correct language names and flags', async () => {
        render(LanguageSwitcher);
        const mainButton = screen.getByRole('button');
        await fireEvent.click(mainButton); // Open dropdown

        const englishOption = await screen.findByText(/English/);
        expect(englishOption.textContent).toContain('🇬🇧'); // Check for flag
        expect(englishOption.textContent).toContain('English');

        const bulgarianOption = await screen.findByText(/Bulgarian/);
        expect(bulgarianOption.textContent).toContain('🇧🇬');
        expect(bulgarianOption.textContent).toContain('Bulgarian');

        const hungarianOption = await screen.findByText(/Hungarian/);
        expect(hungarianOption.textContent).toContain('🇭🇺');
        expect(hungarianOption.textContent).toContain('Hungarian');
    });
});
