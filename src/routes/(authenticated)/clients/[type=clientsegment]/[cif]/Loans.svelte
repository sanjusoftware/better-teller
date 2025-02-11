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
		<ChartMixedDollarOutline size="sm" />New Loan
	</Button>
	<Button color="alternative">Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
	<Dropdown class="w-48 p-3 space-y-2 text-sm">
		<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Show only:</h6>
		{#each ['Active', 'NPA', 'Closed'] as loanStatus}
			<li>
				<Checkbox>{loanStatus} (5)</Checkbox>
			</li>
		{/each}
	</Dropdown>
{/snippet}

{#snippet tableRow(loan)}
	<TableBodyRow class="text-base">
		<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
		<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<div class="text-base font-semibold text-gray-900 dark:text-white">
					<a href="/transactions" class="hover:underline">
						{loan.accountNumber}
					</a>
					<button use:copy={loan.accountNumber}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right" trigger="click" class="text-sm font-light">
						Copied account number: {loan.accountNumber}
					</Tooltip>
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					IBAN: {loan.iban}
					<button use:copy={loan.iban}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right" trigger="click" class="text-sm font-light">
						Copied IBAN: {loan.iban}
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
				<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
					<EyeSolid size="sm" /> Statement
				</Button>
				<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
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
