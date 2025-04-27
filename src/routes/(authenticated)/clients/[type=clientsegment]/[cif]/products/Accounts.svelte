<script lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);

	import { page } from '$app/state';
	import { Card, Tooltip } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import { statusBorderColor, formatBalance } from '$lib/utils/accountHelper';

	let accounts = $derived(page.data.Accounts);	
</script>

<div class="grid gap-4 xl:grid-cols-1 xl:gap-4 p-2">
	{#each accounts as account}
		<Card
			size="none"
			class="bg-gray-50 dark:bg-gray-800 shadow-sm"
			style="border-left: 4px solid {statusBorderColor(account.status)}"
		>
			<div class="flex justify-between w-full">
				<div>
					<p class="font-bold text-gray-900 dark:text-gray-400">{account.type} account - ({account.currency})</p>
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
</div>

{#if accounts.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No accounts opened.</h1>
	</div>
{/if}
