<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, TabItem, Tabs } from 'flowbite-svelte';
	import { ChartMixedDollarOutline, CreditCardOutline, WalletOutline } from 'flowbite-svelte-icons';

	import { page } from '$app/state';
	import Accounts from './Accounts.svelte';
	import BankCards from './BankCards.svelte';
	import Loans from './Loans.svelte';

	let { client, open } = $derived(page.data);
	const tabs = ['cards', 'accounts', 'loans'];
	const openTab = $derived(open ? (tabs.includes(open) ? open : 'accounts') : 'accounts');

	function isOpen(tabName: string): boolean {
		return tabName === openTab;
	}
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem>{client.name}</BreadcrumbItem>
	<BreadcrumbItem>Products Summary</BreadcrumbItem>
</Breadcrumb>

<Tabs
	tabStyle="full"
	contentClass="p-2 bg-white dark:bg-gray-800"
	defaultClass="flex rounded-lg divide-x rtl:divide-x-reverse divide-gray-200 shadow-sm dark:divide-gray-700"
>
	<TabItem open={isOpen('accounts')}>
		<div slot="title" class="flex items-center gap-2">
			<WalletOutline size="md" />
			Accounts
		</div>
		<Accounts />
	</TabItem>
	<TabItem open={isOpen('cards')}>
		<div slot="title" class="flex items-center gap-2">
			<CreditCardOutline size="md" />
			Cards
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<BankCards />
		</div>
	</TabItem>
	<TabItem open={isOpen('loans')}>
		<div slot="title" class="flex items-center gap-2">
			<ChartMixedDollarOutline size="md" />
			Loans
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<Loans />
		</div>
	</TabItem>
</Tabs>
