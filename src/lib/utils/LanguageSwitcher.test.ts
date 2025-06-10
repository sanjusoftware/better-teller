import { render, fireEvent, screen, waitFor } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { writable } from 'svelte/store';

import LanguageSwitcher from './LanguageSwitcher.svelte';

// --- Mocks ---

// Mock svelte-i18n
const mockSvelteI18nLocale = writable('en');
const mockTranslate = (key: string, options?: any) => {
    if (key === 'languages.en') return 'English';
    if (key === 'languages.bg') return 'Bulgarian';
    if (key === 'languages.hu') return 'Hungarian';
    // For aria-label on the main button, which uses the same key
    if (key === ('languages.' + get(mockSvelteI18nLocale)) && options?.values === undefined) {
        return mockTranslate('languages.' + get(mockSvelteI18nLocale));
    }
    return key;
};
const readableMockTranslate = writable(mockTranslate); // svelte-i18n's _ is a store

vi.mock('svelte-i18n', () => ({
    _: readableMockTranslate,
    locale: mockSvelteI18nLocale,
    t: readableMockTranslate,
    init: vi.fn(),
    register: vi.fn(),
    waitLocale: vi.fn().mockResolvedValue(undefined),
    getLocaleFromNavigator: vi.fn(() => 'en')
}));

// Mock $lib/i18n.ts
const mockSetLocale = vi.fn((lang: string) => {
    mockSvelteI18nLocale.set(lang);
});
vi.mock('$lib/i18n', () => ({
    supportedLocales: ['en', 'bg', 'hu'],
    setLocale: mockSetLocale,
}));

// Mock Flowbite Svelte Icons (only ChevronDownOutline is now directly in LanguageSwitcher)
const createIconStub = (name: string) => ({
    render: () => ({ Component: class { static $is_flanker = true; } }),
    name,
});

vi.mock('flowbite-svelte-icons', () => ({
    ChevronDownOutline: createIconStub('ChevronDownOutline'),
    // GlobeOutline is no longer used, so no need to mock it here.
}));

// SVG Flag components from $lib/icons/flags are NOT mocked.
// We will test for their output (e.g., the title attribute of their span).

// --- Tests ---

describe('LanguageSwitcher.svelte (with SVG Flags)', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        mockSvelteI18nLocale.set('en');
    });

    it('displays the current language name and its flag title on the main button', () => {
        render(LanguageSwitcher);
        const mainButton = screen.getByRole('button'); // The Flowbite Button
        expect(mainButton).toBeInTheDocument();
        expect(mainButton.textContent).toContain('English');
        // Check for the title attribute of the span rendered by GbFlag.svelte
        expect(screen.getByTitle('UK Flag')).toBeInTheDocument();
    });

    it('calls setLocale with "bg" and updates main button when Bulgarian DropdownItem is clicked', async () => {
        render(LanguageSwitcher);
        const mainButton = screen.getByRole('button');
        await fireEvent.click(mainButton); // Open dropdown

        // Find the DropdownItem for Bulgarian by its text content
        const bulgarianOptionText = await screen.findByText('Bulgarian');
        // DropdownItem in Flowbite Svelte typically renders as a button or a link-like element if href is provided.
        // Assuming it's a button or can be found by role 'menuitem' or similar.
        // Clicking the text element itself if it's distinct enough, or its closest interactive parent.
        let bulgarianOptionButton = bulgarianOptionText.closest('button') || bulgarianOptionText.closest('[role="menuitem"]') || bulgarianOptionText;
        if (!bulgarianOptionButton) {
            // Fallback if closest doesn't work, try to find by role if text is inside a specific role
            bulgarianOptionButton = screen.getByRole('menuitem', { name: /Bulgarian/i });
        }
        await fireEvent.click(bulgarianOptionButton);

        expect(mockSetLocale).toHaveBeenCalledWith('bg');

        // mockSetLocale already updates mockSvelteI18nLocale in our mock setup
        // Check if main button updates
        await waitFor(() => {
            expect(mainButton.textContent).toContain('Bulgarian');
            expect(screen.getByTitle('Bulgarian Flag')).toBeInTheDocument();
        });
    });

    it('main button text and flag update correctly when locale changes multiple times', async () => {
        render(LanguageSwitcher);
        const mainButton = screen.getByRole('button');

        // Initial: English
        expect(mainButton.textContent).toContain('English');
        expect(screen.getByTitle('UK Flag')).toBeInTheDocument();

        // Change to Hungarian
        mockSetLocale('hu'); // This updates mockSvelteI18nLocale
        await waitFor(() => {
            expect(mainButton.textContent).toContain('Hungarian');
            expect(screen.getByTitle('Hungarian Flag')).toBeInTheDocument();
        });

        // Change back to Bulgarian
        mockSetLocale('bg');
        await waitFor(() => {
            expect(mainButton.textContent).toContain('Bulgarian');
            expect(screen.getByTitle('Bulgarian Flag')).toBeInTheDocument();
        });
    });

    it('dropdown items display correct flags (by title) and names', async () => {
        render(LanguageSwitcher);
        const mainButton = screen.getByRole('button');
        await fireEvent.click(mainButton); // Open dropdown

        // Check English option
        const englishOptionText = await screen.findByText('English');
        expect(englishOptionText).toBeInTheDocument();
        expect(screen.getByTitle('UK Flag')).toBeInTheDocument(); // Assuming title is unique enough for this check

        // Check Bulgarian option
        const bulgarianOptionText = await screen.findByText('Bulgarian');
        expect(bulgarianOptionText).toBeInTheDocument();
        expect(screen.getByTitle('Bulgarian Flag')).toBeInTheDocument();

        // Check Hungarian option
        const hungarianOptionText = await screen.findByText('Hungarian');
        expect(hungarianOptionText).toBeInTheDocument();
        expect(screen.getByTitle('Hungarian Flag')).toBeInTheDocument();
    });
});
