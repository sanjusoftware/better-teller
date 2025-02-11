<script lang="ts">
	import transactions from '$lib/data/transactions.json';
	import CreditCard from '$lib/utils/CreditCard.svelte';
	import Pagination from '$lib/utils/Pagination.svelte';
	import StatusBadge from '$lib/utils/StatusBadge.svelte';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);
	import { copy } from 'svelte-copy';

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

	let searchPlaceholder = 'Search by Transaction Id, Description, Details ...';
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem href="/transactions">Transactions</BreadcrumbItem>
</Breadcrumb>

<Pagination
	items={transactions}
	{searchPlaceholder}
	fieldsToSearch={['description', 'detail', 'id']}
	tableHeaders={[
		'Transaction ID',
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

{#snippet tableRow(transaction)}
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
				<Tooltip placement="right" trigger="click" class="text-sm font-light">
					Copied Transaction ID: {transaction.id}
				</Tooltip>
			</div>
			
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
