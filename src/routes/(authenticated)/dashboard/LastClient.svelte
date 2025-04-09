<script lang="ts">
	import { Avatar, Button, Card, Heading, Tooltip } from 'flowbite-svelte';
	import {
		ClockOutline,
		EnvelopeOutline,
		FileCopyAltOutline,
		PhoneOutline,
		UserCircleOutline
	} from 'flowbite-svelte-icons';
	import { copy } from 'svelte-copy';
	export let client: {
		cif: number;
		type: string;
		avatar: string;
		name: string;
		email: string;
		phone: string;
		country: string;
		status: string;
	};
	let pictureClass =
		client.status === 'Active'
			? 'mb-4 h-28 w-28 sm:mb-0 xl:mb-4 2xl:mb-0 ring-2 ring-green-500'
			: 'mb-4 h-28 w-28 sm:mb-0 xl:mb-4 2xl:mb-0 border-2 border-red-500';
</script>

<Card
	size="none"
	class="block shadow-sm sm:flex sm:space-x-4 sm:py-6 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4"
	horizontal
>
	<div class="mb-4 flex items-center justify-between">
		<div class="flex items-center gap-2 font-medium text-grey-600">
			<UserCircleOutline />
			<span>Last Client Served</span>
		</div>
		<div>
			<span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
			  <ClockOutline class="w-2.5 h-2.5 me-1.5" />
			  Serving Time 5 mins
			</span>
		  </div>
	</div>
	<div class="flex items-center space-x-4 rtl:space-x-reverse">
		<Avatar src={client.avatar} class={pictureClass} rounded border size="none" href={`/clients/${client.type}/${client.cif}`}/>
		<div class="space-y-1 font-small dark:text-white">
			<Heading tag="h3" class="text-xl">
				<a href={`/clients/${client.type}/${client.cif}`}>
					{client.name}
				</a>				
			</Heading>
			<div class="text-sm text-gray-500 dark:text-gray-400">
				CIF: {client.cif}
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
	</div>
	<div class="pt-1">
		<div class="mb-4 flex items-center justify-between">
			<span class="h-8 bg-orange-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
				<ClockOutline class="w-3 h-3 me-1.5" />
				40 clients waiting
			  </span>
			<Button outline size="xs" class="px-3">Get Next Client</Button>
		</div>
	</div>
</Card>
