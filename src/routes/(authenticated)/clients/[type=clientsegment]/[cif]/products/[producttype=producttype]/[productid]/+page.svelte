<script lang="ts">
	import { page } from '$app/state';
	import { clientProductSummaryPath } from '$lib/utils/pathHelper';
	import { Breadcrumb, BreadcrumbItem, TabItem, Tabs } from 'flowbite-svelte';
	import {
		ChartMixedDollarOutline,
		ChevronUpOutline,
		CreditCardOutline,
		WalletOutline
	} from 'flowbite-svelte-icons';
	import Transactions from '$lib/utils/Transactions.svelte';
	import AccountCard from '$lib/utils/AccountCard.svelte';

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
	contentClass="p-2 bg-white dark:bg-gray-800  rounded-lg"
	defaultClass="flex dark:divide-gray-700"
>
	<TabItem
		open
		inactiveClasses="p-4 text-gray-500 bg-white rounded-tl-lg"
		activeClasses="p-4 text-green-500 underline underline-offset-4 decoration-2 bg-white rounded-tl-lg dark:bg-gray-800 dark:text-primary-500"
	>
		<div slot="title" class="flex items-center gap-1">
			<WalletOutline size="md" />
			<a href={clientProductSummaryPath(client, 'casa')}>Accounts</a>
		</div>
		<div class="p-2">
			<AccountCard {account} {openclosebutton} open={true} />
			{#snippet openclosebutton()}
				<a href={clientProductSummaryPath(client, 'casa')}>
					<ChevronUpOutline size="xl" class="text-green-600 dark:text-gray-400" />
				</a>
			{/snippet}
			<Transactions {transactions} currency={account.currency} />
		</div>
	</TabItem>
	<TabItem
		inactiveClasses="p-4 text-gray-500 bg-white"
		activeClasses="p-4 text-green-500 underline underline-offset-4 decoration-2 bg-white dark:bg-gray-800 dark:text-primary-500"
	>
		<div slot="title" class="flex items-center gap-1">
			<CreditCardOutline size="md" />
			<a href={clientProductSummaryPath(client, 'cards')}>Cards</a>
		</div>
	</TabItem>
	<TabItem
		inactiveClasses="p-4 text-gray-500 bg-white rounded-tr-lg"
		activeClasses="p-4 text-green-500 underline underline-offset-4 decoration-2 bg-white rounded-tr-lg dark:bg-gray-800 dark:text-primary-500"
	>
		<div slot="title" class="flex items-center gap-1">
			<ChartMixedDollarOutline size="md" />
			<a href={clientProductSummaryPath(client, 'loans')}>Loans</a>
		</div>
	</TabItem>
</Tabs>
