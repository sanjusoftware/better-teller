<script lang="ts">
	import ActivityList from './ActivityList.svelte';
	import Insights from './Insights.svelte';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let activities = data.Activities;
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>My Dashboard</BreadcrumbItem>
</Breadcrumb>

<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
	<ActivityList {activities} />
	<Insights />
</div>
