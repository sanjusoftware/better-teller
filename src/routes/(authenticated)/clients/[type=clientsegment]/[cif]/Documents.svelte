<script lang="ts">
	import Pagination from '$lib/utils/Pagination.svelte';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);

	import {
		Button,
		ButtonGroup,
		Checkbox,
		Dropdown,
		Modal,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';
	import {
		BellRingOutline,
		CheckOutline,
		CloseOutline,
		DownloadOutline,
		EyeSolid,
		FilterSolid,
		TrashBinOutline,
		UploadOutline
	} from 'flowbite-svelte-icons';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let documents = data.Documents;
	let client = data.client;
	let searchPlaceholder = 'Search by File Name, Document Type, Document Id ...';
	let documentOpen = $state(false);
</script>

<Pagination
	items={documents}
	{searchPlaceholder}
	fieldsToSearch={['documentId', 'documentName', 'documentType', 'issuedBy']}
	tableHeaders={['Type', 'File Name', 'Issuer', 'Expiry', 'Status', 'Actions']}
	{searchHeader}
	{tableRow}
/>

{#snippet searchHeader()}
	<Button
		size="sm"
		class="gap-2 whitespace-nowrap px-3"
		href={`/clients/${client.type}/${client.cif}/documents/new`}
	>
		<UploadOutline size="sm" />Upload New Document
	</Button>
	<Button color="alternative">Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
	<Dropdown class="w-48 p-3 space-y-2 text-sm">
		<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Show only:</h6>
		<li>
			<Checkbox>ID Document (2)</Checkbox>
		</li>
		<li>
			<Checkbox>Collatral (1)</Checkbox>
		</li>
	</Dropdown>
{/snippet}

{#snippet tableRow(document: any)}
	<TableBodyRow class="text-base">
		<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<div class="text-base font-semibold text-gray-900 dark:text-white">
					{document.documentSubType}
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					{document.documentType}
					<span class="text-gray-500 dark:text-gray-400">({document.documentId})</span>
				</div>
			</div>
		</TableBodyCell>
		<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<div class="text-base font-semibold text-gray-900 dark:text-white">
					<button
						type="button"
						onclick={() => (documentOpen = true)}
						class="hover:underline"
						aria-label="Open document {document.documentName}"
					>
						{document.documentName}
					</button>
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					Size: {document.documentSize}
					{document.documentFormat}
				</div>
			</div>
		</TableBodyCell>
		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<div class="text-base font-semibold text-gray-900 dark:text-white">
					{document.issuedBy}
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					Issue Date: {dayjs(document.issueDate).format('ll')}
				</div>
			</div>
		</TableBodyCell>
		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			{dayjs(document.expiryDate).format('ll')}
		</TableBodyCell>
		<TableBodyCell class="p-4 font-normal">
			<StatusIndicator status={document.documentStatus} />
		</TableBodyCell>
		<TableBodyCell class="space-x-2 p-4">
			<ButtonGroup>
				<Button
					onclick={() => (documentOpen = true)}
					outline
					color="light"
					size="xs"
					class="gap-2 px-3"
				>
					<EyeSolid size="sm" /> View
				</Button>
				<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
					<DownloadOutline size="sm" /> Download
				</Button>
			</ButtonGroup>
			{#if document.documentStatus === 'Pending Verification'}
				<ButtonGroup>
					<Button outline color="green" size="xs" class="gap-2 px-3">
						<CheckOutline size="sm" /> Verify
					</Button>
					<Button outline color="yellow" size="xs" class="gap-2 px-3">
						<CloseOutline size="sm" /> Reject
					</Button>
				</ButtonGroup>
			{:else if document.documentStatus === 'Expired'}
				<Button outline color="dark" size="xs" class="gap-2 px-3">
					<BellRingOutline size="sm" /> Renewal Reminder
				</Button>
			{/if}
			<Button outline color="red" size="xs" class="gap-2 px-3">
				<TrashBinOutline size="sm" /> Delete
			</Button>
		</TableBodyCell>
		<Modal
			id={document.documentId}
			title="{document.documentSubType} - {document.documentName}"
			bind:open={documentOpen}
			classBackdrop="bg-opacity-20 dark:bg-opacity-20"
			size="xl"
		>
			<iframe src="/images/sample.pdf?url" width="100%" height="1000px" title="PDF"></iframe>
			<svelte:fragment slot="footer">
				<Button on:click={() => alert('E-Signature Initiated"')}>Initiate E-Signature</Button>
			</svelte:fragment>
		</Modal>
	</TableBodyRow>
{/snippet}

{#if documents.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No documents found.</h1>
	</div>
{/if}
