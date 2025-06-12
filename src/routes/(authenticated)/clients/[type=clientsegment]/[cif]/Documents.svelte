<script lang="ts">
	import Pagination from '$lib/utils/Pagination.svelte';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);

	import { page } from '$app/state';
	import { documentSchema } from '$lib/schemas/documentSchema';
	import { documentTypes } from '$lib/utils/constants';
	import {
		Alert,
		Button,
		ButtonGroup,
		Checkbox,
		Fileupload,
		Helper,
		Input,
		Label,
		Modal,
		Select,
		Spinner,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';
	import {
		BellRingOutline,
		CheckOutline,
		CloseOutline,
		DownloadOutline,
		EyeSolid,
		TrashBinOutline,
		UploadOutline
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { dateProxy, fileProxy, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { _ } from 'svelte-i18n';

	let documents = $derived(page.data.Documents);
	// searchPlaceholder prop will be localized directly in Pagination component usage
	let newDocumentModal = $state(false);
	const modalStates: { [key: string]: boolean } = $state({});

	const { form, errors, message, enhance, constraints, delayed } = superForm(page.data.documentForm, {
		validators: zodClient(documentSchema)
	});

	const proxyFile = fileProxy(form, 'document_file');
	const issueDateProxy = dateProxy(form, 'document_issue_date', { format: 'date' });
	const expiryDateProxy = dateProxy(form, 'document_expiry_date', { format: 'date' });

	function openModal(documentId: string) {
		modalStates[documentId] = true;
	}

	onMount(() => {
		documents.forEach((doc: any) => {
			modalStates[doc.documentId] = false;
		});
	});

	$: tableHeadersLocalized = [
		$_('documents.table.type'),
		$_('documents.table.fileName'),
		$_('documents.table.issuer'),
		$_('documents.table.expiry'),
		$_('clients.table.status'), // Reusing general status key
		$_('common.actions')
	];
</script>

<Pagination
	items={documents}
	searchPlaceholder={$_('documents.searchPlaceholder')}
	fieldsToSearch={['documentId', 'documentName', 'documentType', 'issuedBy']}
	filtersToApply={['documentSubType', 'issuedBy']}
	tableHeaders={tableHeadersLocalized}
	{searchHeader}
	{tableRow}
/>

{#snippet searchHeader()}
	<Button size="sm" class="gap-2 whitespace-nowrap px-3" on:click={() => (newDocumentModal = true)}>
		<UploadOutline size="sm" />{$_('documents.uploadNewButton')}
	</Button>
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
						onclick={() => openModal(document.documentId)}
						class="hover:underline"
						aria-label="Open document {document.documentName}"
					>
						{document.documentName}
					</button>
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					{$_('documents.sizeLabel')} {document.documentSize}
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
					{$_('documents.issueDateLabel')} {dayjs(document.issueDate).format('ll')}
				</div>
			</div>
		</TableBodyCell>
		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			<!-- Assuming this is Expiry Date, might need a label if context is lost -->
			{$_('documents.expiryDateLabel')} {dayjs(document.expiryDate).format('ll')}
		</TableBodyCell>
		<TableBodyCell class="p-4 font-normal">
			<StatusIndicator status={document.documentStatus} />
		</TableBodyCell>
		<TableBodyCell class="space-x-2 p-4">
			<ButtonGroup>
				<Button
					onclick={() => openModal(document.documentId)}
					outline
					color="light"
					size="xs"
					class="gap-2 px-3"
				>
					<EyeSolid size="sm" /> {$_('common.view')}
				</Button>
				<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
					<DownloadOutline size="sm" /> {$_('common.download')}
				</Button>
			</ButtonGroup>
			{#if document.documentStatus === 'Pending Verification'}
				<ButtonGroup>
					<Button outline color="green" size="xs" class="gap-2 px-3">
						<CheckOutline size="sm" /> {$_('clients.details.verifyButton')}
					</Button>
					<Button outline color="yellow" size="xs" class="gap-2 px-3">
						<CloseOutline size="sm" /> {$_('common.reject')}
					</Button>
				</ButtonGroup>
			{:else if document.documentStatus === 'Expired'}
				<Button outline color="dark" size="xs" class="gap-2 px-3">
					<BellRingOutline size="sm" /> {$_('documents.renewalReminder')}
				</Button>
			{/if}
			<Button outline color="red" size="xs" class="gap-2 px-3">
				<TrashBinOutline size="sm" /> {$_('common.delete')}
			</Button>
		</TableBodyCell>
		<Modal
			bind:open={modalStates[document.documentId]}
			title="{document.documentSubType} - {document.documentName}"
			classBackdrop="bg-opacity-20 dark:bg-opacity-20"
			size="xl"
		>
			<iframe src="/images/sample.pdf?url" width="100%" height="1000px" title="PDF"></iframe>
			<svelte:fragment slot="footer">
				<Button on:click={() => alert('E-Signature Initiated"')}>{$_('documents.initiateESignature')}</Button>
			</svelte:fragment>
		</Modal>
	</TableBodyRow>
{/snippet}

<Modal bind:open={newDocumentModal} size="md" autoclose={false} class="w-full">
	{#if $message}
	<Alert dismissable color={page.status == 200 ? 'green' : 'red'}>
		{page.status == 200 ? $_('common.success') : $_('common.error')}
		{$message}
	</Alert>
	{/if}
	<form method="POST" action="?/upload_document" use:enhance enctype="multipart/form-data" class="flex flex-col space-y-3">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
			{$_('documents.modalTitleNew', { values: { clientName: page.data.client.name } })}
		</h3>
		<div>
			<Label for="document_file" class="mb-2">{$_('documents.chooseDocumentLabel')}</Label>
			<Fileupload
				required
				clearable
				bind:files={$proxyFile}
				accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
				type="file"
				name="document_file"
			/>
			<Helper class="mt-2" color="green">
				{$_('documents.allowedFileTypes')}
				<span class="font-medium">{$_('documents.maxFileSize')}</span>
			</Helper>
			{#if $errors.document_file}
				<Helper class="mt-2" color="red">
					{$errors.document_file}
				</Helper>
			{/if}
		</div>
		<div class="grid gap-6 mb-6 md:grid-cols-2">
			<div>
				<Label for="document_issuer" class="mb-2">{$_('documents.documentIssuerLabel')}</Label>
				<Input
					bind:value={$form.document_issuer}
					aria-invalid={$errors.document_issuer ? 'true' : undefined}
					{...$constraints.document_issuer}
					type="text"
					id="document_issuer"
					name="document_issuer"
					placeholder={$_('documents.documentIssuerPlaceholder')}
					required
					color={$errors.document_issuer ? 'red' : undefined}
				/>
				{#if $errors.document_issuer}
					<Helper class="mt-2" color="red">
						{$errors.document_issuer}
					</Helper>
				{/if}
			</div>
			<Label>
				{$_('documents.documentTypeLabel')}
				<Select
					class="mt-2"
					id="document_type"
					name="document_type"
					bind:value={$form.document_type}
					items={documentTypes} /* documentTypes items might need localization if they are strings */
					placeholder={$_('documents.documentTypePlaceholder')}
				/>
				{#if $errors.document_type}
					<Helper class="mt-2" color="red">
						{$errors.document_type}
					</Helper>
				{/if}
			</Label>
			<div>
				<Label for="document_issue_date" class="mb-2">{$_('documents.documentIssueDateLabel')}</Label>
				<input
					name="document_issue_date"
					type="date"
					bind:value={$issueDateProxy}
					aria-invalid={$errors.document_issue_date ? 'true' : undefined}
					{...$constraints.document_issue_date}
					min={$constraints.document_issue_date?.min?.toString().slice(0, 10)}
					max={$constraints.document_issue_date?.max?.toString().slice(0, 10)}
				/>
				{#if $errors.document_issue_date}
					<Helper class="mt-2" color="red">
						{$errors.document_issue_date}
					</Helper>
				{/if}
			</div>
			<div>
				<Label for="document_expiry_date" class="mb-2">{$_('documents.expiryDateLabel')}</Label>
				<input
					name="document_expiry_date"
					type="date"
					bind:value={$expiryDateProxy}
					aria-invalid={$errors.document_expiry_date ? 'true' : undefined}
					{...$constraints.document_expiry_date}
					min={$constraints.document_expiry_date?.min?.toString().slice(0, 10)}
					max={$constraints.document_expiry_date?.max?.toString().slice(0, 10)}
				/>
				{#if $errors.document_expiry_date}
					<Helper class="mt-2" color="red">
						{$errors.document_expiry_date}
					</Helper>
				{/if}
			</div>
			<Button type="submit" class="w-fit">{$_('common.submit')}</Button>
			{#if $delayed}<Spinner />{/if}
		</div>
	</form>
</Modal>

{#if documents.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>{$_('documents.noDocumentsFound')}</h1>
	</div>
{/if}
