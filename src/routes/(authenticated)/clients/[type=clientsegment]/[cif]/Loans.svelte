<script lang="ts">
	import {
		Button,
		Checkbox,
		Search,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import {
		BookOpenOutline,
		BookOutline,
		CashOutline,
		ChartMixedDollarOutline,
		EyeSolid,
		HomeOutline,
		TruckClockOutline
	} from 'flowbite-svelte-icons';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import { TableHeader } from 'flowbite-svelte-blocks';

	export let loans: Array<{
		accountNumber: string;
		customerId: number;
		principle_amount: number;
		roi: number;
		created_on: string;
		emi: number;
		maturity_date: string;
		type: string;
		status: string;
	}> = [];
</script>

<TableHeader headerType="search">
	<Search slot="search" size="md" placeholder="Search by Account Number, Loan Type ..." />
	<Button
		on:click={() => {
			/* logic to issue new loan */
		}}
		class="w-fit"
	>
		<ChartMixedDollarOutline size="md" class="mr-2" />
		Issue New Loan
	</Button>
</TableHeader>
<Table>
	<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
		<TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell>
		{#each ['Account Number', 'Type', 'Amount', 'Opened on', 'EMI', 'Status', 'Actions'] as title}
			<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each loans as loan}
			<TableBodyRow class="text-base">
				<TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell>
				<TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<div class="text-base font-semibold text-gray-900 dark:text-white">
							<a href="/transactions" class="hover:underline">
								{loan.accountNumber}
							</a>
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					<span class="flex items-center space-x-2">
						{#if loan.type === 'Home'}
							<HomeOutline size="md" />
						{:else if loan.type === 'WCL'}
							<CashOutline size="md" />
						{:else if loan.type === 'Auto'}
							<TruckClockOutline size="md" />
						{/if}
						<span>{loan.type}</span>
					</span>
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
						{new Date(loan.created_on).toLocaleDateString()}
					</div>
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					{loan.emi.toLocaleString()}
				</TableBodyCell>
				<TableBodyCell class="p-4 font-normal">
					<StatusIndicator status={loan.status} />
				</TableBodyCell>
				<TableBodyCell class="space-x-2 p-4">
					<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
						<EyeSolid size="sm" /> Statement
					</Button>
					{#if loan.status === 'Active'}
						<Button outline color="red" size="xs" class="gap-2 px-3">
							<BookOutline size="sm" /> Close
						</Button>
					{:else if loan.status === 'Defaulted' || loan.status === 'NPA'}
						<Button outline size="xs" class="gap-2 px-3">
							<BookOpenOutline size="sm" /> Reopen
						</Button>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
{#if loans.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No loans</h1>
	</div>
{/if}
