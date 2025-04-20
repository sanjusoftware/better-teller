<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import QuickActions from './QuickActions.svelte';
	import QuickProducts from './QuickProducts.svelte';
	import LastestClients from './LatestClientsServed.svelte';
	import { page } from '$app/state';
	import WelcomeCard from './WelcomeCard.svelte';
	import ServiceTimeStats from './ServiceTimeStats.svelte';

	let currentClient = $derived(page.data.currentClient);
	let latestClients = $derived(page.data.latestClients);
	let ticket: string = $derived(page.data.ticket);
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Home</BreadcrumbItem>
	<BreadcrumbItem>Dashboard</BreadcrumbItem>
</Breadcrumb>
<div class="grid grid-cols-2 gap-2 xl:grid-cols-2 dark:bg-gray-900 xl:gap-2 flex">
	<div class="flex flex-col gap-2">
		{#if currentClient}
			<QuickActions />
		{:else}
			<WelcomeCard {ticket} />
			<!-- <QuickProducts /> -->
		{/if}
	</div>
	<div class="grid gap-2 dark:bg-gray-900 xl:gap-2">
		{#if currentClient}
			<QuickActions />
		{:else}
			{#if latestClients}
				<LastestClients {latestClients} />
			{/if}
			<ServiceTimeStats />
		{/if}
	</div>
</div>
