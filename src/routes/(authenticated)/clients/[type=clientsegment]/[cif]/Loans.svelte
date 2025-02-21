<script lang="ts">	
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import { copy } from 'svelte-copy';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import Pagination from '$lib/utils/Pagination.svelte';

	import {
		Button,
		ButtonGroup,
		Checkbox,
		Dropdown,
		TableBodyCell,
		TableBodyRow,
		Tooltip
	} from 'flowbite-svelte';
	import {
		BookOpenOutline,
		CashOutline,
		ChartMixedDollarOutline,
		CirclePlusOutline,
		DownloadOutline,
		EyeSolid,
		FileCopyOutline,
		FilterSolid,
		HomeOutline,
		LockOpenOutline,
		TruckClockOutline
	} from 'flowbite-svelte-icons';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let loans = data.Loans;
	let client = data.client;

	let searchPlaceholder = 'Search by Account Number, IBAN ...';
</script>

<Pagination
	items={loans}
	{searchPlaceholder}
	fieldsToSearch={['accountNumber', 'iban']}
	filtersToApply={['type', 'status']}
	tableHeaders={[
		'Account Number',
		'Cif',
		'Type',
		'Amount',
		'Opened on',
		'EMI',
		'Status',
		'Actions'
	]}
	{searchHeader}
	{tableRow}
/>

{#snippet searchHeader()}
	<Button
		size="sm"
		class="gap-2 whitespace-nowrap px-3"
		href={`/clients/${client.type}/${client.cif}/loans/new`}
	>
		<ChartMixedDollarOutline size="sm" />Open New Loan
	</Button>
{/snippet}

{#snippet tableRow(loan: any)}
	<TableBodyRow class="text-base">
		<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
		<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<div class="text-base font-semibold text-gray-900 dark:text-white">
					<a href="/transactions?accountnumber={loan.accountNumber}" class="hover:underline">
						{loan.accountNumber}
					</a>
					<Tooltip placement="top" class="text-sm font-light">
						View Transactions
					</Tooltip>
					<button use:copy={loan.accountNumber}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right" class="text-sm font-light">
						Copy account number: {loan.accountNumber}
					</Tooltip>
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					IBAN: {loan.iban}
					<button use:copy={loan.iban}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right" class="text-sm font-light">
						Copy IBAN: {loan.iban}
					</Tooltip>
				</div>
			</div>
		</TableBodyCell>
		<TableBodyCell class="text-sm font-normal p-4">
			{loan.customerId}
		</TableBodyCell>
		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			{#if loan.type === 'Home'}
				<HomeOutline size="sm" class="mr-1" />
			{:else if loan.type === 'WCL'}
				<CashOutline size="sm" class="mr-1" />
			{:else if loan.type === 'Auto'}
				<TruckClockOutline size="sm" class="mr-1" />
			{/if}
			{loan.type}
		</TableBodyCell>

		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			<div class="text-base font-semibold text-gray-900 dark:text-white">
				{loan.principle_amount.toLocaleString()}
			</div>
			<div class="text-sm font-small text-gray-500 dark:text-gray-400">
				@{loan.roi}%
			</div>
		</TableBodyCell>
		<TableBodyCell
			class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
		>
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				{dayjs(loan.created_on).format('ll')}
			</div>
		</TableBodyCell>
		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			{loan.emi.toLocaleString()}
		</TableBodyCell>
		<TableBodyCell class="p-4 font-normal">
			<StatusIndicator status={loan.status} />
		</TableBodyCell>
		<TableBodyCell class="space-x-2 p-4">
			<ButtonGroup>
				<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions?accountnumber={loan.accountNumber}">
					<EyeSolid size="sm" /> Statement
				</Button>
				<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions?accountnumber={loan.accountNumber}">
					<DownloadOutline size="sm" /> Download
				</Button>
			</ButtonGroup>
			{#if loan.status === 'Active'}
				<Button outline size="xs" class="gap-2 px-3">
					<CirclePlusOutline size="sm" /> TopUp
				</Button>
			{:else if loan.status === 'Closed'}
				<Button outline size="xs" class="gap-2 px-3">
					<BookOpenOutline size="sm" /> Reopen
				</Button>
			{/if}
			{#if loan.status !== 'Closed'}
				<Button outline color="red" size="xs" class="gap-2 px-3">
					<LockOpenOutline size="sm" /> Close
				</Button>
			{/if}
		</TableBodyCell>
	</TableBodyRow>
{/snippet}

{#if loans.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No loans</h1>
	</div>
{/if}
