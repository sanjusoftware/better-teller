<script lang="ts">	
	import { page } from '$app/state';
	import { formatAccountsBalance } from '$lib/utils/accountHelper';
	import { Button } from 'flowbite-svelte';
	import AccountCard from '$lib/utils/AccountCard.svelte';
	import { accountTransactionsPath } from '$lib/utils/pathHelper';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	let { client, accounts } = $derived(page.data);
</script>

<div class="grid gap-4 xl:grid-cols-1 xl:gap-4 p-2">
	{#if accounts.length > 0}
		{#each accounts as account}
			<AccountCard {account} {openclosebutton} open={false} />
			{#snippet openclosebutton()}
				<a href={accountTransactionsPath(client, account)}>
					<ChevronDownOutline size="xl" class="text-green-600 dark:text-gray-400" />
				</a>
			{/snippet}
		{/each}
		<div class="p-4">
			<div class="flex justify-end space-x-2">
				<p class="text-md font-bold text-gray-400 dark:text-gray-300">Total balance:</p>
				<p class="text-lg font-bold text-gray-900 dark:text-gray-100">
					{formatAccountsBalance('en-US', accounts)}
				</p>
			</div>
			<div class="flex justify-end space-x-2">
				<p class="text-md text-gray-400 dark:text-gray-300">Total available balance:</p>
				<p class="text-lg font-bold text-gray-900 dark:text-gray-100">
					{formatAccountsBalance('en-US', accounts)}
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
