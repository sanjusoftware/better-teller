<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import QuickActions from './QuickActions.svelte';
	import QuickProducts from './QuickProducts.svelte';
	import TicketQueue from './TicketQueue.svelte';
	import ProductStats from './ProductStats.svelte';
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Home</BreadcrumbItem>
	<BreadcrumbItem>Dashboard</BreadcrumbItem>
</Breadcrumb>
<div class="grid grid-cols-1 gap-2 xl:grid-cols-3 dark:bg-gray-900 xl:grid-cols-3 xl:gap-2">
	<div class="flex flex-col gap-2 col-span-2">
		<QuickActions />
	</div>
	<TicketQueue />
	<div class="flex flex-col gap-2 col-span-2">
		<QuickProducts />
	</div>
	<ProductStats />
</div>
