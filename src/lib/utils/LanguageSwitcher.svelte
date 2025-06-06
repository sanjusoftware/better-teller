<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { locale as currentLocaleStore } from 'svelte-i18n'; // Import the actual store
    import { supportedLocales, setLocale } from '$lib/i18n'; // My custom setup

    // Ensure supportedLocales is an array, if not, get it from i18n setup if possible
    // For this example, `supportedLocales` from `$lib/i18n` is used.

    function changeLanguage(lang: string) {
        // Type assertion as setLocale expects 'en' | 'bg' | 'hu' or a string it can validate
        setLocale(lang);
    }
</script>

<div class="language-switcher flex space-x-2 p-2 items-center">
    {#each supportedLocales as langCode (langCode)}
        <button
            on:click={() => changeLanguage(langCode)}
            class:active={$currentLocaleStore === langCode}
            class:inactive={$currentLocaleStore !== langCode}
            class="px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50"
            class:bg-primary-600={$currentLocaleStore === langCode}
            class:text-white={$currentLocaleStore === langCode}
            class:bg-gray-200={$currentLocaleStore !== langCode}
            class:text-gray-700={$currentLocaleStore !== langCode}
            class:hover:bg-primary-500={$currentLocaleStore === langCode}
            class:hover:text-white={$currentLocaleStore === langCode}
            class:hover:bg-gray-300={$currentLocaleStore !== langCode}
            aria-label={$_('languages.' + langCode)}
        >
            {$_('languages.' + langCode)}
        </button>
    {/each}
</div>

<style>
    /* Simplified active state is handled by Tailwind-like classes above */
    /* You can add more specific styles here if needed */
    .language-switcher button.active {
        /* Example: Additional border or shadow for active state if not covered by bg/text color */
        /* box-shadow: 0 0 0 2px theme('colors.primary.700'); */
    }
    .language-switcher button.inactive {
        /* Styles for inactive buttons if needed */
    }
</style>
