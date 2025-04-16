<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import QuickActions from './QuickActions.svelte';
	import QuickProducts from './QuickProducts.svelte';
	import TicketQueue from './TicketQueue.svelte';
	import ClientsServedStats from './ClientsServedStats.svelte';
	import { page } from '$app/state';
	import WelcomeCard from './WelcomeCard.svelte';
	import ServiceTimeStats from './ServiceTimeStats.svelte';
	let currentClient = page.data.currentClient;
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Home</BreadcrumbItem>
	<BreadcrumbItem>Dashboard</BreadcrumbItem>
</Breadcrumb>
<div class="grid grid-cols-1 gap-2 xl:grid-cols-2 dark:bg-gray-900 xl:gap-2">
	<div class="flex flex-col gap-2">
		{#if currentClient}
			<QuickActions />
		{:else}
			<WelcomeCard />
		{/if}
	</div>
	<div class="grid grid-cols-1 gap-2 dark:bg-gray-900 xl:grid-cols-1 xl:gap-2">
		{#if currentClient}
		<QuickActions />
	{:else}
		<ClientsServedStats />
		<ServiceTimeStats />
	{/if}
	</div>
	<div class="flex flex-col gap-2 col-span-2">
		<QuickProducts />
	</div>
</div>
