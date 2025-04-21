<script lang="ts">
	import { enhance } from '$app/forms';
	import { servingTicket, ticket } from '$lib/store';
	import { Badge, Button, Checkbox, Dropdown, DropdownItem, Modal, Search } from 'flowbite-svelte';
	import { ChevronDownOutline, CameraPhotoOutline, AngleRightOutline } from 'flowbite-svelte-icons';
	import { Circle } from 'svelte-loading-spinners';

	let clientVerficationModal = $state(false);
	let OCRModal = $state(false);
	let selectedItem = $state('UCN');
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

{#if !$servingTicket && $ticket}
	<div>
		<form
			action="?/startService"
			method="POST"
			class="flex items-center justify-center"
			use:enhance={() => {
				return ({ result, update }) => {
					update().finally(async () => {
						if (result.type === 'success') {
							console.log('Started serving ticket: ', result.data?.ticket);
							$servingTicket = result.data?.ticket as string | null;
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
				<input type="hidden" name="ticket" value={$ticket} />
				<Badge
					rounded
					class="mr-5 h-8 p-2 text-sm font-medium text-gray-800 bg-white dark:text-primary-800 dark:bg-white"
				>
					Got Ticket: {$ticket}
				</Badge>
				Start Service
			</Button>
		</form>
	</div>
{/if}

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
			<Circle size="120" color="#37c92c" unit="px" duration="1s" />	
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
					update().finally(async () => {
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
				<Button pill outline color="light" disabled={scanning} class="w-1/2" on:click={cancelScan}>
					Back
				</Button>
			</div>
		</form>
	{/if}
	<p class="text-sm text-gray-500 dark:text-gray-400 mt-4">
		Note: The scanned ID document will be stored securely and will not be shared with any third
		party.
	</p>
</Modal>
