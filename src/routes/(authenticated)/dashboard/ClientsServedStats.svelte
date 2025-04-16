<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import Change from '$lib/utils/Change.svelte';
	import DarkChart from '$lib/utils/DarkChart.svelte';
	import ClientsServedStats from '$lib/data/clents_served_stats';
</script>

<Card horizontal class="items-center justify-between" size="xl">
	<div class="w-full">
		<p>Clients Served</p>
		<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">4,420</p>
		<Change size="sm" value={-3.4} since="Since last month" />
	</div>
	<DarkChart configFunc={ClientsServedStats} class="w-full" />
</Card>
