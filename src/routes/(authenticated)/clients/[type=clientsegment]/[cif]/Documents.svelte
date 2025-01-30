<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Search,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import {
		BellRingOutline,
		CheckOutline,
		CloseOutline,
		DownloadOutline,
		EyeSolid,
		FileCirclePlusOutline,
		TrashBinOutline
	} from 'flowbite-svelte-icons';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import { TableHeader } from 'flowbite-svelte-blocks';

	export let documents: Array<{
		documentId: string;
		documentType: string;
		documentSubType: string;
		documentUrl: string;
		documentName: string;
		customerId: number;
		issueDate: string;
		expiryDate: string;
		issuedBy: string;
		documentStatus: string;
		documentVerificationDate: string;
		documentVerificationBy: string;
		documentCategory: string;
		documentTags: string[];
		documentSize: string;
		documentFormat: string;
		documentLanguage: string;
	}> = [];
</script>

<TableHeader headerType="search">
	<Search slot="search" size="md" placeholder="Search by File Name, Document Type, Document Id ..." />
	<Button
		on:click={() => {
			/* logic to add new doument */
		}}
		class="w-fit"
	>
		<FileCirclePlusOutline size="md" class="mr-2" />
		Open New Document
	</Button>
</TableHeader>
<Table>
	<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
		{#each ['Type', 'File Name', 'Issuer', 'Expiry', 'Status', 'Actions'] as title}
			<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each documents as document}
			<TableBodyRow class="text-base">
				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<div class="text-base font-semibold text-gray-900 dark:text-white">
							{document.documentSubType}
						</div>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							{document.documentType} Document
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<div class="text-base font-semibold text-gray-900 dark:text-white">
							<a href={document.documentUrl} class="hover:underline">
								{document.documentName}
							</a>
						</div>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							Format: {document.documentSize}
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
							Issued on: {document.issueDate}
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					{new Date(document.expiryDate).toLocaleDateString()}
				</TableBodyCell>
				<TableBodyCell class="p-4 font-normal">
					<StatusIndicator status={document.documentStatus} />
				</TableBodyCell>
				<TableBodyCell class="space-x-2 p-4">
					<ButtonGroup>
						<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
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
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
{#if documents.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No documents found.</h1>
	</div>
{/if}
