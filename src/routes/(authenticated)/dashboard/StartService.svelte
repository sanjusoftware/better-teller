<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		isCurrentClient,
		nextTicket,
		servingTicket,
		setCurrentClient
	} from '$lib/servicecontext.svelte';
	import DskSpinner from '$lib/utils/DSKSpinner.svelte';
	import { Badge, Button, Checkbox, Dropdown, DropdownItem, Modal, Search } from 'flowbite-svelte';
	import { AngleRightOutline, CameraPhotoOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
	import { Circle } from 'svelte-loading-spinners';

	let clientVerficationModal = $state(servingTicket.current !== '' && !isCurrentClient());
	let OCRModal = $state(false);
	let startScanConsent = $state(false);
	let scanning = $state(false);
	let scanModalTitle = $derived(
		scanning ? 'Please wait!! Scanning in progress...' : 'Scan ID Document'
	);
	const searchableItems = [
		{
			label: 'UCN',
			placeholder: 'Search UCN or EGN'
		},
		{
			label: 'Client Number',
			placeholder: 'Search CIF'
		},
		{
			label: 'Account',
			placeholder: 'Search account number'
		},
		{
			label: 'Phone Number',
			placeholder: 'Search Phone Number'
		},
		{
			label: 'Email',
			placeholder: 'Search Email'
		}
	];
	let selectedItem = $state('UCN');
	let searchPlaceholder = $derived(
		searchableItems.find((item) => item.label === selectedItem)?.placeholder
	);

	async function cancelVerification() {
		clientVerficationModal = false;
		servingTicket.current = '';
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

{#if servingTicket.current === '' && nextTicket.current != ''}
	<div>
		<form
			action="?/startService"
			method="POST"
			class="flex items-center justify-center"
			use:enhance={() => {
				return ({ result, update }) => {
					update().finally(async () => {
						if (result.type === 'success') {
							servingTicket.current = result.data?.ticket;
							clientVerficationModal = true;
						} else {
							new Error('Error starting service: ' + result.status);
						}
					});
				};
			}}
		>
			<Button
				pill
				outline
				color="light"
				class="mt-5 text-md font-medium inline-flex items-center bg-gray-200 text-gray-800 dark:bg-green-900 dark:text-green-300"
				type="submit"
			>
				<input type="hidden" name="ticket" value={nextTicket.current} />
				<Badge
					rounded
					class="mr-5 h-8 p-2 text-sm font-medium text-gray-800 bg-white dark:text-primary-800 dark:bg-white"
				>
					Got Ticket: {nextTicket.current}
				</Badge>
				Start Service
			</Button>
		</form>
	</div>
{/if}

<!-- Modal for client verification -->
<Modal
	title="Client Identification - Ticket {servingTicket.current}"
	classHeader="text-gray-900"
	bind:open={clientVerficationModal}
	size="sm"
	autoclose={false}
	dismissable={false}
>
	<p class="text-sm text-gray-500 dark:text-gray-400 text-left">
		Verify the client information before proceeding.
	</p>
	<div class="flex items-center justify-between" style="height: auto;">
		<div class="relative flex-shrink-0">
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
			class="rounded-s-none border focus:outline-none flex-grow"
			placeholder={searchPlaceholder}
		/>
		<span class="text-sm ml-2">OR</span>
		<Button pill type="button" class="flex-shrink-0 ml-2" on:click={startOCR}>
			<CameraPhotoOutline class="w-4 h-4 me-2" />OCR
		</Button>
	</div>
	<Button pill outline color="red" on:click={cancelVerification}>Release Ticket</Button>
</Modal>

<!-- Modal for OCR scanning -->
<Modal
	title={scanModalTitle}
	classHeader="text-gray-900"
	bind:open={OCRModal}
	size="sm"
	autoclose={false}
	dismissable={false}
>
	{#if scanning}
		<DskSpinner />
	{:else}
		<p class="text-sm text-gray-800 dark:text-gray-400 text-left">
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
				return ({ result, update }) => {
					update().finally(async () => {
						if (result.type === 'success') {
							scanning = false;
							setCurrentClient(result.data?.currentClient);
						} else {
							new Error('Error scanning ID document: ' + result.status);
						}
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
				<Button pill outline color="light" disabled={scanning} class="w-1/2" on:click={cancelScan}>
					Back
				</Button>
			</div>
		</form>
	{/if}
	<p class="text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
		Note: The scanned ID document will be stored securely and will not be shared with any third
		party.
	</p>
</Modal>
