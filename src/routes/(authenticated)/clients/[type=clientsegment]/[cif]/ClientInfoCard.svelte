<script lang="ts">
	import { humanize } from '$lib/utils/strings';
	import { Card, Tooltip } from 'flowbite-svelte';
	import { CheckCircleOutline, CloseCircleOutline } from 'flowbite-svelte-icons';
	import IDCard from './IDCard.svelte';
	let { client } = $props();

</script>

<h2 class="text-md font-semibold text-gray-500 mb-4">Client's Information</h2>
<Card class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
	<IDCard IDForntImage={client.id_card_front_image} IDBackImage={client.id_card_back_image} />
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-1 xl:gap-4">
		<div class="flex flex-col space-y-3">
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Name</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					{client.name}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">ID number</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					#{client.cif}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Nationality</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					{client.country}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Type</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					{humanize(client.type)}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Phone number</div>
				<div class="flex items-center justify-between w-full">
					<span class="text-gray-900 dark:text-gray-200 font-semibold">
						{client.phone}
					</span>
					{#if client.phone_verified}
						<CheckCircleOutline class="mr-1" size="sm" color="green" />
						<Tooltip>
							<span class="text-xs">Verified</span>
						</Tooltip>
					{:else}
						<CloseCircleOutline class="mr-1" size="sm" color="red" />
						<Tooltip>
							<span class="text-xs">Not verified</span>
						</Tooltip>
					{/if}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Phone number</div>
				<div class="flex items-center justify-between w-full">
					<span class="text-gray-900 dark:text-gray-200 font-semibold">
						{client.email}
					</span>
					{#if client.email_verified}
						<CheckCircleOutline class="mr-1" size="sm" color="green" />
						<Tooltip>
							<span class="text-xs">Verified</span>
						</Tooltip>
					{:else}
						<CloseCircleOutline class="mr-1" size="sm" color="red" />
						<Tooltip>
							<span class="text-xs">Not verified</span>
						</Tooltip>
					{/if}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Client's address</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					{client.address}
				</div>
			</div>
		</div>
	</div>
</Card>
