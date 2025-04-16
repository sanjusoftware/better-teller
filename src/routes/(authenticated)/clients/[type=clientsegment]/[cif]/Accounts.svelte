<script lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import { copy } from 'svelte-copy';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);

	import Pagination from '$lib/utils/Pagination.svelte';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import {
		Button,
		ButtonGroup,
		Checkbox,
		TableBodyCell,
		TableBodyRow,
		Tooltip
	} from 'flowbite-svelte';
	import {
		ChartMixedDollarOutline,
		CheckOutline,
		CloseOutline,
		DownloadOutline,
		EyeSolid,
		FileCopyOutline,
		LockTimeOutline,
		SalePercentOutline,
		WalletOutline
	} from 'flowbite-svelte-icons';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let accounts = data.Accounts;
	let client = data.client;
</script>

<Pagination
	items={accounts}
	searchPlaceholder="Search by Account number or IBAN ..."
	fieldsToSearch={['accountNumber', 'iban']}
	filtersToApply={['status']}
	tableHeaders={[
		'Account Number',
		'Type',
		'Balance',
		'Opened On',
		'Status',
		'Card',
		'Actions'
	]}
	{searchHeader}
	{tableRow}
/>

{#snippet searchHeader()}
	<Button
		size="sm"
		class="gap-2 whitespace-nowrap px-3"
		href={`/clients/${client.type}/${client.cif}/accounts/new`}
	>
		<WalletOutline size="sm" />Open New Account
	</Button>	
{/snippet}

{#snippet tableRow(account: any)}
	<TableBodyRow class="text-base">
		<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
		<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<div class="text-base font-semibold text-gray-900 dark:text-white">
					<a href="/transactions?accountnumber={account.accountNumber}" class="hover:underline">
						{account.accountNumber}
					</a>
					<Tooltip placement="top" class="text-sm font-light">
						View Transactions
					</Tooltip>

					<button use:copy={account.accountNumber}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right" class="text-sm font-light">
						Copy account number: {account.accountNumber}
					</Tooltip>
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					IBAN: {account.iban}
					<button use:copy={account.iban}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right"  class="text-sm font-light">
						Copy IBAN: {account.iban}
					</Tooltip>
				</div>
			</div>
		</TableBodyCell>
		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			{#if account.type === 'Loan'}
				<ChartMixedDollarOutline class="mr-2" />
			{:else}
				<SalePercentOutline class="mr-2" />
			{/if}
			{account.type}
		</TableBodyCell>
		<TableBodyCell
			class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
		>
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<div class="text-base font-semibold text-gray-900 dark:text-white">
					{account.balance.toLocaleString()}
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					{account.currency}
				</div>
			</div>
		</TableBodyCell>
		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			{dayjs(account.opened_on).format('ll')}
		</TableBodyCell>
		<TableBodyCell class="p-4 font-normal">
			<StatusIndicator status={account.status} />
		</TableBodyCell>
		<TableBodyCell class="p-4 font-normal">
			{account.card_issued ? 'Yes' : 'No'}
		</TableBodyCell>
		<TableBodyCell class="space-x-2 p-4">
			<ButtonGroup>
				<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions?accountnumber={account.accountNumber}">
					<EyeSolid size="sm" /> Statement
				</Button>
				<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions?accountnumber={account.accountNumber}">
					<DownloadOutline size="sm" /> Download
				</Button>
			</ButtonGroup>
			{#if account.status === 'Active'}
				<Button outline color="yellow" size="xs" class="gap-2 px-3">
					<LockTimeOutline size="sm" /> Suspend
				</Button>
				<Button outline color="red" size="xs" class="gap-2 px-3">
					<CloseOutline size="sm" /> Close
				</Button>
			{:else if account.status === 'Pending Activation' || account.status === 'Blocked'}
				<Button outline color="green" size="xs" class="gap-2 px-3">
					<CheckOutline size="sm" /> Activate
				</Button>
			{:else if account.status === 'Suspended'}
				<Button outline color="green" size="xs" class="gap-2 px-3">
					<LockTimeOutline size="sm" /> Unsuspend
				</Button>
			{/if}
		</TableBodyCell>
	</TableBodyRow>
{/snippet}

{#if accounts.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No accounts opened.</h1>
	</div>
{/if}
