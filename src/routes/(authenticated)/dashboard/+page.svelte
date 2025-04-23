<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import QuickActions from './QuickActions.svelte';
	import LastestClients from './LatestClientsServed.svelte';
	import WelcomeCard from './WelcomeCard.svelte';
	import ServiceTimeStats from './ServiceTimeStats.svelte';
	import { isCurrentClient } from '$lib/servicecontext.svelte';
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Home</BreadcrumbItem>
	<BreadcrumbItem>Dashboard</BreadcrumbItem>
</Breadcrumb>
<div class="grid grid-cols-2 gap-2 xl:grid-cols-2 dark:bg-gray-900 xl:gap-2 flex">
	<div class="flex flex-col gap-2">
		<WelcomeCard />
		{#if isCurrentClient()}
			<QuickActions />
		{/if}
	</div>
	<div class="grid gap-2 dark:bg-gray-900 xl:gap-2">
		<LastestClients />
		<ServiceTimeStats />
	</div>
</div>
