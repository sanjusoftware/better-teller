<script lang="ts">
	import { deserialize, enhance } from '$app/forms';
	import { page } from '$app/state';
	import { currentClientID, servingTicket, ticket } from '$lib/store';
	import { humanize } from '$lib/utils/strings';
	import type { ActionResult } from '@sveltejs/kit';
	import {
		Badge,
		Button,
		Card,
		Checkbox,
		Dropdown,
		DropdownItem,
		Modal,
		Search
	} from 'flowbite-svelte';
	import {
		AngleRightOutline,
		CameraPhotoOutline,
		ChevronDownOutline,
		ClockOutline
	} from 'flowbite-svelte-icons';
	let clientVerficationModal = $state(false);
	let OCRModal = $state(true);
	let selectedItem = $state('UCN');
	let startScanConsent = $state(false);
	let scanning = $state(false);
	let scanModalTitle = $derived(scanning ? "Please wait!! Scanning in progress..." : "Scan ID Document");
	const searchableItems = [
		{
			label: 'UCN',
			placeholder: 'Search UCN or EGN'
		},
		{
			label: 'CIF',
			placeholder: 'Search CIF'
		},
		{
			label: 'Mobile No.',
			placeholder: 'Search Mobile'
		}
	];
	let searchPlaceholder = $derived(
		searchableItems.find((item) => item.label === selectedItem)?.placeholder
	);

	async function getNextTicket() {
		const data = new FormData();
		const response = await fetch('?/getNextTicket', {
			method: 'POST',
			body: data
		});
		const result: ActionResult = deserialize(await response.text());
		if (result.type === 'success') {
			$ticket = result.data?.ticket;
		} else {
			new Error('Error aquiring ticket: ' + result.status);
		}
	}

	async function startService() {
		const data = new FormData();
		if ($ticket) {
			data.append('ticket', $ticket);
		}
		const response = await fetch('?/startService', {
			method: 'POST',
			body: data
		});
		const result: ActionResult = deserialize(await response.text());
		if (result.type === 'success') {
			$servingTicket = result.data?.ticket;
			clientVerficationModal = true;
		} else {
			new Error('Error starting service: ' + result.status);
		}
	}

	async function cancelVerification() {
		clientVerficationModal = false;
		$servingTicket = null;
	}

	async function cancelScan() {
		clientVerficationModal = true;
		OCRModal = false;
	}
	async function startOCR() {
		clientVerficationModal = false;
		OCRModal = true;
	}

</script>

<Card class="text-center flex items-center" size="xl">
	<h5 class="mt-5 mb-3 text-3xl font-bold text-gray-800 dark:text-white">
		Welcome {humanize(page.data.session?.user.name ?? 'Guest')}
	</h5>
	<h1 class="mb-5 font-bold text-2xl text-gray-500 dark:text-gray-200">Have a nice day!</h1>
	<Badge
		rounded
		class="h-8 mb-5 p-8 text-xl font-bold inline-flex items-center bg-gray-200 text-gray-600 dark:bg-green-900 dark:text-green-300 hover:bg-gray-300"
	>
		<ClockOutline size="xl" />
		<p class="ml-2 mr-10">Waiting Tickets</p>
		<Badge
			rounded
			class="w-8 h-8 ms-2 p-0 font-bold text-primary-800 bg-white dark:text-primary-800 dark:bg-white"
		>
			40
		</Badge>
	</Badge>
	{#if $servingTicket}
		<Button pill color="red" size="xs" class="px-3">Complete Service - {$servingTicket}</Button>
	{:else}
		<div class="mb-5 space-y-4 sm:space-y-0 sm:space-x-4">
			<Button
				pill
				on:click={getNextTicket}
				class="mt-5 h-15 text-md inline-flex items-center dark:bg-green-900 dark:text-green-300"
				type="submit"
			>
				Get Next Ticket
				<AngleRightOutline size="md" class="w-5 h-5 ms-2" />
			</Button>
			{#if $ticket}
				<div>
					<Button
						pill
						on:click={startService}
						outline
						color="light"
						class="mt-5 text-md font-medium inline-flex items-center bg-gray-200 text-gray-800 dark:bg-green-900 dark:text-green-300"
						type="submit"
					>
						<Badge
							rounded
							class="mr-5 h-8 p-2 text-sm font-medium text-gray-800 bg-white dark:text-primary-800 dark:bg-white"
						>
							Got Ticket: {$ticket}
						</Badge>
						Start Service
					</Button>
				</div>
			{/if}
		</div>
	{/if}
</Card>

<!-- Modal for client verification -->
<Modal
	title="Client Identification - Ticket {$servingTicket}"
	classHeader="text-gray-900"
	bind:open={clientVerficationModal}
	size="sm"
	autoclose={false}
>
	<p class="text-sm text-gray-500 dark:text-gray-400">
		Verify the client information before proceeding.
	</p>
	<form class="flex flex-col" action="#">
		<div class="flex items-center">
			<div class="relative">
				<Button class="rounded-e-none whitespace-nowrap border border-e-0 border-primary-700">
					{selectedItem}
					<ChevronDownOutline class="w-2.5 h-2.5 ms-2.5" />
				</Button>
				<Dropdown classContainer="w-40">
					{#each searchableItems as { label }}
						<DropdownItem
							on:click={() => {
								selectedItem = label;
							}}
							class={selectedItem === label ? 'underline' : ''}
						>
							{label}
						</DropdownItem>
					{/each}
				</Dropdown>
			</div>
			<Search
				size="md"
				class="rounded-s-none w-96 border focus:outline-none"
				placeholder={searchPlaceholder}
			/>
		</div>
	</form>

	<div class="space-y-2 font-medium text-center text-gray-500 dark:text-gray-400">OR</div>
	<div class="flex justify-center space-x-4">
		<Button pill type="button" class="w-1/2" on:click={startOCR}>
			<CameraPhotoOutline class="w-4 h-4 me-2" />OCR
		</Button>
		<Button pill outline color="red" class="w-1/2" on:click={cancelVerification}>Cancel</Button>
	</div>
</Modal>

<!-- Modal for OCR scanning -->
<Modal
	title={scanModalTitle}
	classHeader="text-gray-900"
	bind:open={OCRModal}
	size="sm"
	autoclose={false}
>

{#if scanning}
	<div class="flex justify-center items-center h-32">
		<svg
			class="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-200"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Zm2.5 0a5.5 5.5 0 1 0 11 0A5.5 5.5 0 0 0 6.5 12Z"
			/>
		</svg>
	</div>
{:else}
	<p class="text-sm text-gray-800 dark:text-gray-400">
		Please insert the ID document into the scanning device.
		<br />
		Ensure that the document is properly aligned and clear for accurate scanning.
	</p>
	<form
		class="flex flex-col space-y-4"
		method="POST"
		action="?/startScan"
		use:enhance={() => {
			scanning = true;
			return ({ update }) => {
				// Set invalidateAll to false if you don't want to reload page data when submitting
				update({ invalidateAll: false }).finally(async () => {
					scanning = false;
				});
			};
		}}
	>
		<div class="flex items-center">
			<Checkbox
				id="ocr-concent"
				checked={startScanConsent}
				class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
				on:change={() => {
					startScanConsent = !startScanConsent;
				}}
			/>
			<label for="checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
				Client Agreed to Scan ID Document
			</label>
		</div>
		<div class="flex justify-center space-x-4">
			<Button pill disabled={!startScanConsent || scanning} class="w-1/2" type="submit">
				<CameraPhotoOutline class="w-4 h-4 me-2" />
				Start Scan<AngleRightOutline class="w-4 h-4 me-2" />
			</Button>
			<Button pill outline color="light" disabled={scanning} class="w-1/2" on:click={cancelScan}>Back</Button>
		</div>
	</form>
{/if}
	<p class="text-sm text-gray-500 dark:text-gray-400 mt-4">
		Note: The scanned ID document will be stored securely and will not be shared with any third party.
	</p>
</Modal>