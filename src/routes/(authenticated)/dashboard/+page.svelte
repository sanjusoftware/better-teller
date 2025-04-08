<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import QuickActions from './QuickActions.svelte'
	import QuickProducts from './QuickProducts.svelte'
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let activities = data.Activities;
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Home</BreadcrumbItem>
	<BreadcrumbItem >Dashboard</BreadcrumbItem>
</Breadcrumb>

<QuickActions/>
<QuickProducts/>
