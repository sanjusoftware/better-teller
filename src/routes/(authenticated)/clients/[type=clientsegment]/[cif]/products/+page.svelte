<script lang="ts">
	import { Badge, Breadcrumb, BreadcrumbItem, TabItem, Tabs } from 'flowbite-svelte';
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
	defaultClass="flex dark:divide-gray-700"	
>
	<TabItem
		open={isOpen('accounts')}
		inactiveClasses="p-4 text-gray-500 bg-white rounded-tl-lg"
		activeClasses="p-4 text-green-500 underline underline-offset-4 decoration-2 bg-white rounded-tl-lg dark:bg-gray-800 dark:text-primary-500"
	>
		<div slot="title" class="flex items-center gap-1">
			<WalletOutline size="md" />
			Accounts
		</div>
		<Accounts />
	</TabItem>
	<TabItem
		open={isOpen('cards')}
		inactiveClasses="p-4 text-gray-500 bg-white"
		activeClasses="p-4 text-green-500 underline underline-offset-4 decoration-2 bg-white dark:bg-gray-800 dark:text-primary-500"
	>
		<div slot="title" class="flex items-center gap-1" >
			<CreditCardOutline size="md" />
			Cards
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<BankCards />
		</div>
	</TabItem>
	<TabItem
		open={isOpen('loans')}
		inactiveClasses="p-4 text-gray-500 bg-white rounded-tr-lg"
		activeClasses="p-4 text-green-500 underline underline-offset-4 decoration-2 bg-white rounded-tr-lg dark:bg-gray-800 dark:text-primary-500"
	>
		<div slot="title" class="flex items-center gap-1">
			<ChartMixedDollarOutline size="md" />
			Loans
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<Loans />
		</div>
	</TabItem>
</Tabs>
