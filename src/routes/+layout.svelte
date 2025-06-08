<script lang="ts">
	import { browser } from '$app/environment';
	import { locale, _ } from 'svelte-i18n';
	import type { LayoutData } from './$types';
	import '../app.css'; // Global styles
	import { Toast } from 'flowbite-svelte'; // Use Toast component from flowbite-svelte

	export let data: LayoutData;

	// This logic is mostly handled by src/routes/+layout.ts now.
	// This ensures the locale store is reactive to changes if any.
	// if (browser && data && (data as any).locale) {
	//  $locale = (data as any).locale;
	// } else if (browser) {
	//  $locale = window.navigator.language.split('-')[0] || 'en';
	// }
	// The locale store is set in +layout.ts, so data.locale should reflect that.
	// However, svelte-i18n's `locale` store itself is what drives translations.
	// The `load` function in +layout.ts already calls `locale.set()`.

	// Log to see if it works and what the initial value of $_('greeting') is.
	// $: if (browser) console.log('Current greeting translation:', $_ && $_('greeting'));
</script>

<!--
  The lang attribute on <html> is often set in app.html.
  If you need it to be dynamic based on svelte-i18n's locale store,
  you might need a more complex setup or ensure your +layout.ts correctly passes it
  if you are not using SSR predominantly for the lang attribute.
  For SPAs, document.documentElement.lang = $locale; in onMount is an option.
  Given the setup, +layout.ts and possibly hooks.server.ts will manage this.
-->
<!-- <svelte:head>
	{#if $locale}
		<html lang={$locale} />
	{/if}
</svelte:head> -->

<!-- Basic test of translation -->
<!-- <h1>{$_('greeting')}</h1> -->

<Toast /> <!-- Global Toast component -->
<slot />
