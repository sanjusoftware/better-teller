<script lang="ts">
	import { formatAccountsBalance, statusBorderColor } from '$lib/utils/accountHelper';
	import OwnershipIndicator from '$lib/utils/OwnershipIndicator.svelte';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';

	let { account, openclosebutton, open } = $props();
	let divClass = $derived(
		open
			? 'p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-tl-lg rounded-tr-lg'
			: 'p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg'
	);
</script>

<div class={divClass} style="border-left: 4px solid {statusBorderColor(account.status)}">
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
						{formatAccountsBalance('en-US', [account])}
					</p>
				</div>
				<div class="flex items-center space-x-2 justify-end">
					<p class="text-sm text-gray-400 dark:text-gray-600">available balance:</p>
					<p class="text-sm font-medium text-gray-900 dark:text-gray-100">
						{formatAccountsBalance('en-US', [account])}
					</p>
				</div>
			</div>
			{@render openclosebutton()}
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
</div>
