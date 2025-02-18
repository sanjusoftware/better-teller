<script lang="ts">
	import CreditCard from '$lib/utils/CreditCard.svelte';
	import Pagination from '$lib/utils/Pagination.svelte';
	import StatusBadge from '$lib/utils/StatusBadge.svelte';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);
	import { copy } from 'svelte-copy';
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
	let transactions = $derived(data.transactions)

	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Dropdown,
		TableBodyCell,
		TableBodyRow,

		Tooltip

	} from 'flowbite-svelte';

	import {
	FileCopyOutline,
		FilterSolid
	} from 'flowbite-svelte-icons';

	let searchPlaceholder = 'Search by Transaction Id, Account Number, Description, Details ...';
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem href="/transactions">Transactions</BreadcrumbItem>
</Breadcrumb>

<Pagination
	items={transactions}
	{searchPlaceholder}
	fieldsToSearch={['description', 'from_account', 'to_account', 'detail', 'id']}
	tableHeaders={[
		'Transaction ID',
		'From Account',
		'To Account',
		'Type',
		'Details',
		'Description',
		'Date & Time',
		'Amount',
		'Payment method',
		'Status'
	]}
	{searchHeader}
	{tableRow}
/>

{#snippet searchHeader()}
	<Button color="alternative">Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
	<Dropdown class="w-48 p-3 space-y-2 text-sm">
		<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Show only:</h6>
		<li>
			<Checkbox>Incoming (56)</Checkbox>
		</li>
		<li>
			<Checkbox>Outgoing (16)</Checkbox>
		</li>
		<li>
			<Checkbox>Utility Payment (49)</Checkbox>
		</li>
		<li>
			<Checkbox>Reversal (12)</Checkbox>
		</li>
		<li>
			<Checkbox>Domestic (74)</Checkbox>
		</li>
		<li>
			<Checkbox>Intrabank (74)</Checkbox>
		</li>
		<li>
			<Checkbox>International (74)</Checkbox>
		</li>
	</Dropdown>
{/snippet}

{#snippet tableRow(transaction: any)}
	<TableBodyRow>
		<TableBodyCell class="!p-4">
			<Checkbox class="chk" />
		</TableBodyCell>
		<TableBodyCell class="px-4 font-normal">
			<div class="text-base font-semibold text-gray-900 dark:text-white">
				{transaction.id}
				<button use:copy={transaction.id}>
					<FileCopyOutline size="sm" class="mr-2" />
				</button>
				<Tooltip placement="right" class="text-sm font-light">
					Copy Transaction ID: {transaction.id}
				</Tooltip>
			</div>			
		</TableBodyCell>
		<TableBodyCell class="px-4 font-normal">
			<a href="/transactions?accountnumber={transaction.from_account}" class="hover:underline">
				{transaction.from_account}
			</a>
			<Tooltip placement="top" class="text-sm font-light">
				View Transactions
			</Tooltip>
			<button use:copy={transaction.from_account}>
				<FileCopyOutline size="sm" class="mr-2" />
			</button>
			<Tooltip placement="right" class="text-sm font-light">
				Copy account number: {transaction.from_account}
			</Tooltip>
		</TableBodyCell>
		<TableBodyCell class="px-4 font-normal">
			<a href="/transactions?accountnumber={transaction.to_account}" class="hover:underline">
				{transaction.to_account}
			</a>
			<Tooltip placement="top" class="text-sm font-light">
				View Transactions
			</Tooltip>
			<button use:copy={transaction.to_account}>
				<FileCopyOutline size="sm" class="mr-2" />
			</button>
			<Tooltip placement="right" class="text-sm font-light">
				Copy account number: {transaction.to_account}
			</Tooltip>
		</TableBodyCell>
		<TableBodyCell class="px-4 font-normal">{transaction.type}</TableBodyCell>
		<TableBodyCell class="px-4 font-normal">{transaction.detail}</TableBodyCell>
		<TableBodyCell class="px-4 font-normal">{transaction.description}</TableBodyCell>
		<TableBodyCell class="px-4 font-normal text-gray-500 dark:text-gray-400">
			{dayjs(transaction.date).format('ll')}
		</TableBodyCell>
		<TableBodyCell class="px-4">{transaction.amount}</TableBodyCell>
		<TableBodyCell
			class="flex items-center gap-2 px-4 font-normal  text-gray-500 dark:text-gray-400"
		>
			<CreditCard cardType={transaction.method} />
			<span>
				••• {transaction.id.slice(transaction.id.length - 4, transaction.id.length)}
			</span>
		</TableBodyCell>
		<TableBodyCell class="px-4 font-normal">
			<StatusBadge status={transaction.status} />
		</TableBodyCell>
	</TableBodyRow>
{/snippet}
{#if transactions.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No transactions found.</h1>
	</div>
{/if}
