<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { locale as currentLocaleStore } from 'svelte-i18n';
    import { supportedLocales, setLocale } from '$lib/i18n';
    import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import { GbFlag, BgFlag, HuFlag } from '$lib/icons/flags'; // Import SVG flag components

    // Map langCode to Flag Component
    const flagComponents: Record<string, typeof GbFlag> = { // Use typeof one of them for base type
        en: GbFlag,
        bg: BgFlag,
        hu: HuFlag,
    };

    function selectLanguage(langCode: string) {
        setLocale(langCode);
    }

    function getLanguageTranslationKey(langCode: string): any {
        return ('languages.' + langCode) as any;
    }
</script>

<Button
    pill={true}
    class="relative inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary-500 to-green-500 group-hover:from-primary-500 group-hover:to-green-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-primary-200 dark:focus:ring-primary-800"
    aria-label={$_('languages.' + $currentLocaleStore)}
>
    <!-- Inner span for styling the button content area -->
    <span class="relative flex items-center px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        <svelte:component this={flagComponents[$currentLocaleStore]} className="w-5 h-auto mr-2" />
        <span class="align-middle">{$_(getLanguageTranslationKey($currentLocaleStore))}</span>
        <ChevronDownOutline class="w-4 h-4 ml-auto pl-1" />
    </span>
</Button>
<Dropdown class="w-auto z-50" placement="bottom-end">
    {#each supportedLocales as langCode (langCode)}
        <DropdownItem
            on:click={() => selectLanguage(langCode)}
            class="flex items-center {$currentLocaleStore === langCode ? 'bg-gray-100 dark:bg-gray-600' : ''}"
        >
            <svelte:component this={flagComponents[langCode]} className="w-5 h-auto mr-3" />
            {$_(getLanguageTranslationKey(langCode))}
        </DropdownItem>
    {/each}
</Dropdown>

<!--
  No custom style block needed if Flowbite Svelte classes are sufficient.
  The flag components have their own <style> block for default sizing,
  which can be overridden by `className` prop here (e.g., w-5 h-auto).
  `h-auto` will maintain aspect ratio based on the width.
  Removed the previous <style> block and handleClickOutside logic,
  as Flowbite's Dropdown should handle this.
-->
