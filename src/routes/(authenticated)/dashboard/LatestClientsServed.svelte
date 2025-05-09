<script lang="ts">
	import Change from '$lib/utils/Change.svelte';
	import LastRange from '$lib/utils/LastRange.svelte';
	import { Badge, Card, CloseButton, Drawer } from 'flowbite-svelte';
	import { ClockOutline, UsersGroupOutline } from 'flowbite-svelte-icons';
	import { sineIn } from 'svelte/easing';
	import ClientsList from './ClientsList.svelte';
	import { pastClients } from '$lib/servicecontext.svelte';
	import { page } from '$app/state';

	let latestClients = $derived(pastClients.current.length > 0 ? pastClients.current : page.data.latestClients);

	let clientsListHidden = $state(true);
	let transitionParamsRight = {
		x: 320,
		duration: 200,
		easing: sineIn
	};
</script>

<Card size="xl">
	<div class="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
		<div class="flex items-center justify-between">
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
					Avg Serving Time: <Badge rounded><ClockOutline class="w-2.5 h-2.5 me-1.5" />5 mins</Badge>
				</p>
			</div>
		</div>
		<div>
			<div>
				<h5 class="text-right text-2xl font-bold text-gray-900 dark:text-white pb-1">314</h5>
				<Change size="sm" value={13} since="since last month" />
			</div>
		</div>
	</div>
	<div class="border-b border-gray-200 dark:border-gray-700">
		<ClientsList clientsServed={latestClients.slice(0,3)} />
	</div>
	<div class="mt-4 flex items-center justify-between">
		<LastRange timeslot="Today" />
		{#if latestClients.length > 3}
			<button
				type="button"
				onclick={() => (clientsListHidden = false)}
				class="inline-flex items-center rounded-lg p-2 text-xs font-medium text-primary-700 dark:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700"
				aria-label="View clients list"
			>
				View All
			</button>
			<Drawer
				placement="right"
				transitionType="fly"
				transitionParams={transitionParamsRight}
				bind:hidden={clientsListHidden}
				id="clientsListDrawerHidden"
				width="w-180"
			>
				<div class="flex items-center border-b border-gray-200 dark:border-gray-700">
					<h5
						id="drawer-label"
						class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
					>
						<UsersGroupOutline class="w-5 h-5 me-2.5" />All clients served today
					</h5>
					<CloseButton on:click={() => (clientsListHidden = true)} class="mb-4 dark:text-white" />
				</div>
				<ClientsList clientsServed={latestClients} />
			</Drawer>
		{/if}
	</div>
</Card>
