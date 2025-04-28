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
	import { formatBalance } from '$lib/utils/accountHelper';

	let { transactions, currency = 'BGN' } = $props();
</script>

{#if transactions.length > 0}
	<Pagination
		items={transactions}
		searchPlaceholder="Search Txn reference, Account, Description ..."
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
					<button use:copy={transaction.from_account}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
				{:else}
					<span>
						{transaction.from_account}
					</span>
					<button use:copy={transaction.to_account}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
				{/if}
				<Tooltip placement="right" class="text-sm font-light">Copy</Tooltip>
			</TableBodyCell>
			<TableBodyCell class="px-4">
				<span class="{transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}">{transaction.type === 'credit' ? '+' : '-'}{formatBalance('en-US', transaction.amount, currency)}</span>			
			</TableBodyCell>
		</TableBodyRow>
	{/snippet}
{:else}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No transactions yet.</h1>
	</div>
{/if}
