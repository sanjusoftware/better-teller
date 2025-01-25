<script lang="ts">
	import {
		Button,
		Checkbox,
		Card,
		Indicator,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import {
	BadgeCheckOutline,
		BanOutline,
		BookOpenOutline,
		BookOutline,
		CashOutline,
		CheckCircleOutline,
		CheckCircleSolid,
		CheckOutline,
		CloseOutline,
		DownloadSolid,
		EuroOutline,
		EyeSolid,
		HomeOutline,
		LockTimeOutline,
		PauseOutline,
		PlusOutline,
		TicketSolid,
		TruckClockOutline
	} from 'flowbite-svelte-icons';

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

<Card size="xl">
	<div class="flex justify-between items-center mb-4">
		<h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Bank Loans</h1>
		<Button
			on:click={() => {
				/* logic to add new loan */
			}}
			class="w-fit"
		>
			<PlusOutline size="md" class="mr-2" />
			Open New Loan
		</Button>
	</div>
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
                        <div class="flex items-center gap-2">
							{#if loan.status === 'Active'}
								<Indicator color="green" />
							{:else if loan.status === 'Defaulted'}
								<Indicator color="yellow" />
							{:else if loan.status === 'NPA'}
								<Indicator color="red" />
							{:else if loan.status === 'Closed'}
								<Indicator color="gray" />
							{/if}
                            <span>{loan.status}</span>
						</div>
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
			<h1>No loans issues.</h1>
		</div>
	{/if}
</Card>
