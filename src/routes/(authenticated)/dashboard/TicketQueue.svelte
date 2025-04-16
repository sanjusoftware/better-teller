<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { Avatar, Button, Card, CloseButton, Drawer, Heading, Tooltip } from 'flowbite-svelte';
	import {
		ArrowRightOutline,
		ClockOutline,
		EnvelopeOutline,
		FileCopyAltOutline,
		InfoCircleSolid,
		PhoneOutline
	} from 'flowbite-svelte-icons';
	import { copy } from 'svelte-copy';
	import { sineIn } from 'svelte/easing';

	let pastClients = page.data.pastClients;
	let currentClientID = page.data.currentClient;
	let currentTicket = page.data.currentTicket;
	let client = $derived(
		page.data.currentClient || pastClients ? pastClients[pastClients.length - 1] : undefined
	);

	let pictureClass = client
		? client.status === 'Active'
			? 'mb-4 h-28 w-28 sm:mb-0 xl:mb-4 2xl:mb-0 ring-2 ring-green-500'
			: 'mb-4 h-28 w-28 sm:mb-0 xl:mb-4 2xl:mb-0 border-2 border-red-500'
		: '';

	let clientPath = client ? `/clients/${client.type}/${client.cif}` : '#';

	let clientsListHidden = true;
	let transitionParamsRight = {
		x: 320,
		duration: 200,
		easing: sineIn
	};
</script>

<Card
	size="none"
	class="block shadow-sm sm:flex sm:space-x-4 sm:py-6 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4"
	horizontal
>
	<div class="mb-4 flex items-center justify-between">
		<div class="flex items-center gap-2 font-medium text-grey-600">
			<span>Last Client Served</span>
		</div>
		<div>
			<span
				class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300"
			>
				<ClockOutline class="w-2.5 h-2.5 me-1.5" />
				in 5 mins
			</span>
		</div>
		<button
			type="button"
			on:click={() => (clientsListHidden = false)}
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
				for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1
				design job board.
			</p>
			<div class="grid grid-cols-2 gap-4">
				<Button color="light" href="/">Learn more</Button>
				<Button href="/" class="px-4">Get access <ArrowRightOutline class="w-5 h-5 ms-2" /></Button>
			</div>
		</Drawer>
	</div>
	<div class="flex items-center space-x-4 rtl:space-x-reverse">
		<Avatar src={client?.avatar} class={pictureClass} rounded border size="lg" href={clientPath} />
		{#if client}
			<div class="space-y-1 font-small dark:text-white">
				<Heading tag="h3" class="text-xl">
					<a href={clientPath}>
						{client?.name}
					</a>
				</Heading>

				<div class="text-sm text-gray-500 dark:text-gray-400">
					CIF: {client?.cif}
					<button use:copy={client.cif.toString()}>
						<FileCopyAltOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right" trigger="click" class="text-sm font-light">
						Copied CIF: {client.cif}
					</Tooltip>
				</div>
				<span class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
					<EnvelopeOutline size="sm" class="text-gray-500 dark:text-gray-400" />
					<a href={`mailto:${client.email}`} class="hover:underline" aria-label="Email client">
						{client.email}
					</a>
				</span>
				<span class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
					<PhoneOutline size="sm" class="text-gray-500 dark:text-gray-400" />
					<a href={`tel:${client.phone}`} class="hover:underline" aria-label="Call client">
						{client.phone}
					</a>
				</span>
				<div class="text-sm text-gray-500 dark:text-gray-400">{client.country}</div>
			</div>
		{/if}
	</div>
	<div class="pt-1">
		<div class="mb-4 flex items-center justify-between">
			<span
				class="h-8 bg-orange-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300"
			>
				<ClockOutline class="w-3 h-3 me-1.5" />
				40 clients waiting
			</span>
			<form method="post" use:enhance action="?/getNextClient">
				<Button size="xs" class="px-3" type="submit">Get Next Client</Button>
			</form>
		</div>
	</div>
</Card>
