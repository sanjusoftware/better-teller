<script lang="ts">
	import { Avatar, Button, Card, Heading, Tooltip } from 'flowbite-svelte';
	import { CheckCircleOutline, UploadSolid, FileCopyAltOutline, EnvelopeOutline, PhoneOutline } from 'flowbite-svelte-icons';
	import { copy } from 'svelte-copy';
	export let client: {
		cif: string;
		avatar: string;
		name: string;
		email: string;
		phone: string;
		country: string;
		status: string;
	};
	let pictureClass =
		client.status === 'Active'
			? 'mb-4 h-28 w-28 sm:mb-0 xl:mb-4 2xl:mb-0 border-2 border-green-500'
			: 'mb-4 h-28 w-28 sm:mb-0 xl:mb-4 2xl:mb-0 border-2 border-red-500';
</script>

<Card
	size="xl"
	class="block shadow-sm sm:flex sm:space-x-4 sm:py-6 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4"
	horizontal
>
	<div class="flex items-center space-x-4 rtl:space-x-reverse">
		<Avatar src={client.avatar} class={pictureClass} rounded border size="none" />
		<div class="space-y-1 font-small dark:text-white">
			<Heading tag="h3" class="text-xl">{client.name}</Heading>
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
	<div class="py-0.5">
		{#if client.status === 'Active'}
			<div class="flex items-center space-x-4">
				<Button size="sm" class="px-3">
					<UploadSolid size="md" class="-ms-1 me-2" /> Upload picture
				</Button>
			</div>
			<p class="mb-4 mt-1 pt-px text-sm">JPG, GIF or PNG. Max size of 800K</p>
		{:else}
			<div class="flex items-center space-x-4">
				<Button size="sm" color="red" class="px-3">
					<CheckCircleOutline size="md" class="-ms-1 me-2" /> Activate account
				</Button>
			</div>
		{/if}
	</div>
</Card>
