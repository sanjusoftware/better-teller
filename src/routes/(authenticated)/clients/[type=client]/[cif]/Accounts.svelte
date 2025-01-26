<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Search,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import {
		ChartMixedDollarOutline,
		CloseOutline,
		DownloadOutline,
		EyeSolid,
		LockTimeOutline,
		SalePercentOutline,
		WalletOutline
	} from 'flowbite-svelte-icons';
	import StatusIndicator from '../../../../utils/StatusIndicator.svelte';
	import { TableHeader } from 'flowbite-svelte-blocks';

	export let accounts: Array<{
		customerId: number;
		accountNumber: string;
		iban: string;
		balance: number;
		type: string;
		opened_on: string;
		card_issued: boolean;
		currency: string;
		status: string;
	}> = [];
</script>
<TableHeader headerType="search">
	<Search slot="search" size="md" placeholder="Search by Account Number, CIF, IBAN ..." />
	<Button
		on:click={() => {
			/* logic to add new account */
		}}
		class="w-fit"
	>
		<WalletOutline size="md" class="mr-2" />
		Open New Account
	</Button>
</TableHeader>

<Table>
	<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
		{#each ['Account Number', 'Type', 'Balance', 'Opened', 'Status', 'Card', 'Actions'] as title}
			<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each accounts as account}
			<TableBodyRow class="text-base">
				<TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<div class="text-base font-semibold text-gray-900 dark:text-white">
							<a href="/transactions" class="hover:underline">
								{account.accountNumber}
							</a>
						</div>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							IBAN: {account.iban}
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
					{new Date(account.opened_on).toLocaleDateString()}
				</TableBodyCell>
				<TableBodyCell class="p-4 font-normal">
					<StatusIndicator status={account.status} />
				</TableBodyCell>
				<TableBodyCell class="p-4 font-normal">
					{account.card_issued ? 'Yes' : 'No'}
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
					<Button outline color="yellow" size="xs" class="gap-2 px-3">
						<LockTimeOutline size="sm" /> Suspend
					</Button>
					<Button outline color="red" size="xs" class="gap-2 px-3">
						<CloseOutline size="sm" /> Close
					</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
{#if accounts.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No accounts opened.</h1>
	</div>
{/if}
