<script lang="ts">
	import { isCurrentClient } from '$lib/servicecontext.svelte';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import LastestClients from './LatestClientsServed.svelte';
	import QuickActions from './QuickActions.svelte';
	import QuickProducts from './QuickProducts.svelte';
	import ServiceTimeStats from './ServiceTimeStats.svelte';
	import WelcomeCard from './WelcomeCard.svelte';
	import { _ } from 'svelte-i18n';
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>{$_('navbar.dashboard')}</BreadcrumbItem> {/* Assuming "Home" maps to "Dashboard" */}
</Breadcrumb>

{#if isCurrentClient()}
	<QuickActions />
	<QuickProducts />
{:else}
	<div class="grid grid-cols-2 gap-2 xl:grid-cols-2 dark:bg-gray-900 xl:gap-2 flex">
		<div class="flex flex-col gap-2">
			<WelcomeCard />
		</div>
		<div class="grid gap-2 dark:bg-gray-900 xl:gap-2">
			<LastestClients />
			<ServiceTimeStats />
		</div>
	</div>
{/if}
