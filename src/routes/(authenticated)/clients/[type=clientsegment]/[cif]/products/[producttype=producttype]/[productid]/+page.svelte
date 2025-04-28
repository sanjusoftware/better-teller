<script lang="ts">
	import { page } from '$app/state';
	import OwnershipIndicator from '$lib/utils/OwnershipIndicator.svelte';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import { formatAccountsBalance, statusBorderColor } from '$lib/utils/accountHelper';
	import { clientProductSummaryPath } from '$lib/utils/pathHelper';
	import { Breadcrumb, BreadcrumbItem, Card, TabItem, Tabs, Tooltip } from 'flowbite-svelte';
	import {
		ChartMixedDollarOutline,
		ChevronUpOutline,
		CreditCardOutline,
		WalletOutline
	} from 'flowbite-svelte-icons';
	import Transactions from '../../../../../../transactions/Transactions.svelte';

	let { client, account, transactions } = $derived(page.data);
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem>{client.name}</BreadcrumbItem>
	<BreadcrumbItem href={clientProductSummaryPath(client)}>Product Summary</BreadcrumbItem>
	<BreadcrumbItem>{account.iban}</BreadcrumbItem>
</Breadcrumb>

<Tabs
	tabStyle="full"
	contentClass="p-2 bg-white dark:bg-gray-800"
	defaultClass="flex rounded-lg divide-x rtl:divide-x-reverse divide-gray-200 shadow-sm dark:divide-gray-700"
>
	<TabItem open>
		<div slot="title" class="flex items-center gap-2">
			<WalletOutline size="md" />
			<a href={clientProductSummaryPath(client, 'casa')}>Accounts</a>
		</div>
		<div class="p-2">
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
						<a href={clientProductSummaryPath(client, 'casa')}>
							<ChevronUpOutline size="xl" class="text-green-600 dark:text-gray-400" />
						</a>
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
					<Transactions {transactions} currency={account.currency} />
				</div>
			</Card>
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<CreditCardOutline size="md" />
			<a href={clientProductSummaryPath(client, 'cards')}>Cards</a>
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<ChartMixedDollarOutline size="md" />
			<a href={clientProductSummaryPath(client, 'loans')}>Loans</a>
		</div>
	</TabItem>
</Tabs>
