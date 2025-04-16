<script lang="ts">
	import Change from '$lib/utils/Change.svelte';
	import LastRange from '$lib/utils/LastRange.svelte';
	import { Card } from 'flowbite-svelte';
	import { UsersGroupOutline } from 'flowbite-svelte-icons';	
</script>

<Card size="xl">
	<div class="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
		<div class="flex items-center">
			<div
				class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3"
			>
				<UsersGroupOutline class="w-6 h-6 text-gray-500 dark:text-gray-400" />
			</div>
			<div>
				<h5 class="leading-none text-2xl font-bold text-gray-500 dark:text-white pb-1">
					Clients Served
				</h5>
				<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
					Total number of clients served
				</p>
			</div>
		</div>
		<div>
			<h5 class="text-right text-2xl font-bold text-gray-900 dark:text-white pb-1">314</h5>
			<Change size="sm" value={13} since="since last month" />
		</div>
	</div>
	<LastRange />
</Card>
