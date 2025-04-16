<script lang="ts">
	import Change from '$lib/utils/Change.svelte';
	import LastRange from '$lib/utils/LastRange.svelte';
	import { Button, Card, CloseButton, Drawer } from 'flowbite-svelte';
	import { ArrowRightOutline, InfoCircleSolid, UsersGroupOutline } from 'flowbite-svelte-icons';
	import { sineIn } from 'svelte/easing';

	let clientsListHidden = $state(true);
	let transitionParamsRight = {
		x: 320,
		duration: 200,
		easing: sineIn
	};
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
					Served Customers
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
	<div class="flex items-center justify-between">
		<LastRange />
		<button
			type="button"
			onclick={() => (clientsListHidden = false)}
			class="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 dark:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700"
			aria-label="View clients list"
		>
			Show All
		</button>
	</div>
	<Drawer
		placement="right"
		transitionType="fly"
		transitionParams={transitionParamsRight}
		bind:hidden={clientsListHidden}
		id="clientsListDrawerHidden"
	>
		<div class="flex items-center">
			<h5
				id="drawer-label"
				class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
			>
				<InfoCircleSolid class="w-5 h-5 me-2.5" />Info
			</h5>
			<CloseButton on:click={() => (clientsListHidden = true)} class="mb-4 dark:text-white" />
		</div>
		<p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
			Supercharge your hiring by taking advantage of our <a
				href="/"
				class="text-primary-600 underline dark:text-primary-500 hover:no-underline"
			>
				limited-time sale
			</a>
			for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design
			job board.
		</p>
		<div class="grid grid-cols-2 gap-4">
			<Button color="light" href="/">Learn more</Button>
			<Button href="/" class="px-4">Get access <ArrowRightOutline class="w-5 h-5 ms-2" /></Button>
		</div>
	</Drawer>
</Card>
