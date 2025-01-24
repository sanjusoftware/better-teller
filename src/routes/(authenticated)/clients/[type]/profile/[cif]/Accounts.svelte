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
		TableHeadCell,
	} from 'flowbite-svelte';
	import { BanOutline, DownloadSolid, EyeSolid, LockTimeOutline} from 'flowbite-svelte-icons';

	export let accounts: Array<{
		customerId: number;
		accountNumber: string;
		iban: string;
		balance: number;
		type: string;
		opened_on: string;
		card_issued: boolean;
		currency: string;
	}> = [];
</script>

<Card size="xl">
	<Table>
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			<TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell>
			{#each ['Account Number', 'Type', 'Balance', 'Opened on', 'Card', 'Actions'] as title}
				<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each accounts as account}
				<TableBodyRow class="text-base">
					<TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell>
					<TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								<a href="/#" class="hover:underline">
									{account.accountNumber}
								</a>
							</div>
							<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
								IBAN: {account.iban}
							</div>
						</div>
					</TableBodyCell>
					<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">{account.type}</TableBodyCell>
					<TableBodyCell
						class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
					>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								<a href="/#" class="hover:underline">
									{account.balance}
								</a>
							</div>
							<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
								{account.currency}
							</div>
						</div>
					</TableBodyCell>
					<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">{account.opened_on}</TableBodyCell>
					<TableBodyCell class="p-4 font-normal">
						<div class="flex items-center gap-2">
							<Indicator color={account.card_issued ? 'green' : 'red'} />
							{account.card_issued ? 'Yes' : 'No'}
						</div>
					</TableBodyCell>
					<TableBodyCell class="space-x-2 p-4">
						<Button size="xs" class="gap-2 px-3" href="/transactions">
							<EyeSolid size="sm" /> Transactions
						</Button>		
						<Button size="xs" class="gap-2 px-3" href="/transactions">
							<DownloadSolid size="sm" /> Statement
						</Button>											
						<Button color="dark" size="xs" class="gap-2 px-3">
							<LockTimeOutline size="sm" /> Suspend
						</Button>
						<Button color="red" size="xs" class="gap-2 px-3">
							<BanOutline size="sm" /> Block
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</Card>
