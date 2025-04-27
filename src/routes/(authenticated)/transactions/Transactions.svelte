<script lang="ts">
	import Pagination from '$lib/utils/Pagination.svelte';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);
	import { copy } from 'svelte-copy';
	import { Checkbox, TableBodyCell, TableBodyRow, Tooltip } from 'flowbite-svelte';
	import { FileCopyOutline } from 'flowbite-svelte-icons';

	let { transactions } = $props();
</script>

<Pagination
	items={transactions}
	searchPlaceholder="Search by Reference, Account Number, Description ..."
	fieldsToSearch={['id', 'description', 'from_account', 'to_account']}
	filtersToApply={['status']}
	tableHeaders={['Date', 'Reference', 'Account', 'Amount']}
	{tableRow}
/>

{#snippet tableRow(transaction: any)}
	<TableBodyRow>
		<TableBodyCell class="!p-4">
			<Checkbox class="chk" />
		</TableBodyCell>
		<TableBodyCell class="px-4 font-normal text-gray-500 dark:text-gray-400">
			{dayjs(transaction.date).format('ll')}
		</TableBodyCell>
		<TableBodyCell class="px-4 font-normal">
			<div class="text-gray-900 dark:text-white">
				{transaction.id}
				<button use:copy={transaction.id}>
					<FileCopyOutline size="sm" class="mr-2" />
				</button>
				<Tooltip placement="right" class="text-sm font-light">Copy</Tooltip>
			</div>
		</TableBodyCell>
		<TableBodyCell class="px-4 font-normal">
			{#if transaction.type === 'credit'}
				<span>
					{transaction.from_account}
				</span>
				<Tooltip placement="top" class="text-sm font-light">View Transactions</Tooltip>
				<button use:copy={transaction.from_account}>
					<FileCopyOutline size="sm" class="mr-2" />
				</button>
			{:else}
				<span>
					{transaction.from_account}
				</span>
				<Tooltip placement="top" class="text-sm font-light">View Transactions</Tooltip>
				<button use:copy={transaction.to_account}>
					<FileCopyOutline size="sm" class="mr-2" />
				</button>
			{/if}
			<Tooltip placement="right" class="text-sm font-light">Copy</Tooltip>
		</TableBodyCell>
		<TableBodyCell class="px-4">
			{#if transaction.type === 'credit'}
				<span class="text-green-500">{transaction.amount}</span>
			{:else}
				<span class="text-red-500">{transaction.amount}</span>
			{/if}
			<Tooltip placement="top" class="text-sm font-light">View Transactions</Tooltip>
		</TableBodyCell>
	</TableBodyRow>
{/snippet}
{#if transactions.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No transactions found.</h1>
	</div>
{/if}
