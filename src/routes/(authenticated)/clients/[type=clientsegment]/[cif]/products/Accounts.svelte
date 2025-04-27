<script lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);

	import { page } from '$app/state';
	import { formatBalance, statusBorderColor } from '$lib/utils/accountHelper';
	import OwnershipIndicator from '$lib/utils/OwnershipIndicator.svelte';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import { Button, Card, Tooltip } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import Transactions from '../../../../transactions/Transactions.svelte';

	let {accounts, transactions} = $derived(page.data);
</script>

<div class="grid gap-4 xl:grid-cols-1 xl:gap-4 p-2">
	{#if accounts.length > 0}
		{#each accounts as account}
			<Card
				size="none"
				class="bg-gray-50 dark:bg-gray-800 shadow-sm"
				style="border-left: 4px solid {statusBorderColor(account.status)}"
			>
				<div class="flex justify-between w-full">
					<div>
						<div class="flex items-center space-x-2">
							<p class="font-bold text-gray-900 dark:text-gray-400">
								{account.type} account - ({account.currency})
							</p>
							<OwnershipIndicator {account} />
						</div>
						<p class="text-sm text-gray-600 dark:text-gray-400">{account.iban}</p>
						<div class="flex items-center space-x-2">
							<p class="text-sm text-gray-600 dark:text-gray-400">Status:</p>
							<StatusIndicator status={account.status} />
						</div>
					</div>
					<div class="text-right flex items-center justify-end space-x-2">
						<div>
							<div class="flex items-center space-x-2 justify-end">
								<p class="text-sm text-gray-400 dark:text-gray-600">current balance:</p>
								<p class="text-lg font-bold text-gray-900 dark:text-gray-100">
									{formatBalance('en-US', [account])}
								</p>
							</div>
							<div class="flex items-center space-x-2 justify-end">
								<p class="text-sm text-gray-400 dark:text-gray-600">available balance:</p>
								<p class="text-sm font-medium text-gray-900 dark:text-gray-100">
									{formatBalance('en-US', [account])}
								</p>
							</div>
						</div>
						<button onclick={() => (account.showTransactions = !account.showTransactions)}>
							{#if account.showTransactions}
								<ChevronDownOutline size="xl" class="text-green-600 dark:text-gray-400" />
								<Tooltip>Hide transactions</Tooltip>
							{:else}
								<ChevronDownOutline size="xl" class="text-green-600 dark:text-gray-400" />
								<Tooltip>View transactions</Tooltip>
							{/if}
						</button>
					</div>
				</div>
				{#if account.ownership !== 'primary'}
					<div class="border-t border-gray-200 dark:border-gray-700 mt-4 pt-2">
						<p class="text-sm text-gray-600 dark:text-gray-400">
							Primary owner: <a
								href="/clients/retail/{account.primaryOwnerId}/products"
								class="font-medium text-gray-900 dark:text-gray-100"
							>
								{account.primaryOwnerId}
							</a>
						</p>
					</div>
				{/if}
				<div class="mt-4">					
					<Transactions {transactions}/>
				</div>
			</Card>
		{/each}
		<div class="p-4 rounded shadow-sm">
			<div class="flex justify-end space-x-2">
				<p class="text-md font-bold text-gray-400 dark:text-gray-300">Total balance:</p>
				<p class="text-lg font-bold text-gray-900 dark:text-gray-100">
					{formatBalance('en-US', accounts)}
				</p>
			</div>
			<div class="flex justify-end space-x-2">
				<p class="text-md text-gray-400 dark:text-gray-300">Total available balance:</p>
				<p class="text-lg font-bold text-gray-900 dark:text-gray-100">
					{formatBalance('en-US', accounts)}
				</p>
			</div>
		</div>
	{:else}
		<div class="p-4 text-center text-gray-500 dark:text-gray-400 space-y-2">
			<p class="text-sm">Customer has no accounts opened with us.</p>
			<Button href="/products/casa">Open new CASA account</Button>
		</div>
	{/if}
</div>
