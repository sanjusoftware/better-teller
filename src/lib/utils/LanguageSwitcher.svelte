<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { locale as currentLocaleStore } from 'svelte-i18n';
    import { supportedLocales, setLocale } from '$lib/i18n';
    import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownOutline, GlobeAltOutline } from 'flowbite-svelte-icons'; // Using GlobeAltOutline as a more generic icon

    // Map language codes to emoji flags (can be kept for display within DropdownItem)
    const flags: Record<string, string> = {
        en: '🇬🇧',
        bg: '🇧🇬',
        hu: '🇭🇺',
    };

    function selectLanguage(langCode: string) {
        setLocale(langCode);
        // Dropdown closes automatically on item click if not prevented
    }

    // Helper for translation keys, kept for clarity if needed
    function getLanguageTranslationKey(langCode: string): any {
        return ('languages.' + langCode) as any;
    }
</script>

<!--
  Using a Button as the trigger for the Dropdown.
  The Dropdown component itself handles the open/close state.
-->
<Button
    pill={true}
    class="relative inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary-500 to-green-500 group-hover:from-primary-500 group-hover:to-green-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-primary-200 dark:focus:ring-primary-800"
    aria-label={$_('languages.' + $currentLocaleStore)}
>
    <span class="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        <GlobeAltOutline class="w-5 h-5 inline-block mr-1 align-middle" />
        <span class="align-middle">{$_(getLanguageTranslationKey($currentLocaleStore))}</span>
        <ChevronDownOutline class="w-4 h-4 ml-1 inline-block align-middle" />
    </span>
</Button>
<Dropdown class="w-auto z-50" placement="bottom-end">
    {#each supportedLocales as langCode (langCode)}
        <DropdownItem
            on:click={() => selectLanguage(langCode)}
            class={$currentLocaleStore === langCode ? 'bg-gray-100 dark:bg-gray-600' : ''}
        >
            <span class="mr-2">{flags[langCode]}</span>
            {$_(getLanguageTranslationKey(langCode))}
        </DropdownItem>
    {/each}
</Dropdown>

<!--
  No custom style block needed if Flowbite Svelte classes are sufficient.
  Removed the previous <style> block and handleClickOutside logic,
  as Flowbite's Dropdown should handle this.
-->
