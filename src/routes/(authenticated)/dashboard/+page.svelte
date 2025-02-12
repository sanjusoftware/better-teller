<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import ActivityList from './ActivityList.svelte';
	import Insights from './Insights.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let activities = data.Activities;
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Home</BreadcrumbItem>
	<BreadcrumbItem >My Dashboard</BreadcrumbItem>
</Breadcrumb>

<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">	
	<ActivityList {activities} />
	<Insights />
</div>
