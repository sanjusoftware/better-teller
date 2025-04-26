<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, TabItem, Tabs } from 'flowbite-svelte';
	import {
		BellActiveAltOutline,
		ChartMixedDollarOutline,
		CreditCardOutline,
		FileCopyAltOutline,
		FingerprintOutline,
		ProfileCardOutline,
		WalletOutline
	} from 'flowbite-svelte-icons';

	import Accounts from './Accounts.svelte';
	import Alerts from './Alerts.svelte';
	import BankCards from './Cards.svelte';
	import Documents from './Documents.svelte';
	import Emails from './Emails.svelte';
	import IDDcoument from '$lib/utils/IDDocument.svelte';
	import Loans from './Loans.svelte';
	import PasswordInfo from './PasswordInfo.svelte';
	import PersonlaInfo from './PersonalInfo.svelte';
	import Sessions from './Sessions.svelte';
	import { page } from '$app/state';

	let { client, open } = $derived(page.data);
	const tabs = ['identity', 'cards', 'accounts', 'loans', 'documents', 'security', 'alerts'];	
	const openTab = $derived(open ? tabs.includes(open) ? open : 'identity' : 'identity');	

	function isOpen(tabName: string): boolean {
		return tabName === openTab;
	}

</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem href={`/clients/${client.type}`}>
		{client.type.toLocaleUpperCase()} Clients
	</BreadcrumbItem>
	<BreadcrumbItem>{client.name}</BreadcrumbItem>
</Breadcrumb>

<Tabs tabStyle="underline" contentClass="p-2 bg-white rounded-lg dark:bg-gray-800">
	<TabItem open={isOpen('identity')}>
		<div slot="title" class="flex items-center gap-2">
			<ProfileCardOutline size="md" />
			ID Document
		</div>
		<div class="grid grid-cols-7 dark:bg-gray-900 xl:grid-cols-7 xl:gap-3.5">
			<div class="space-y-4 col-span-3">
				<IDDcoument
					IDForntImage={client.id_card_front_image}
					IDBackImage={client.id_card_back_image}
				/>
			</div>
			<div class="space-y-4 col-span-4">
				<PersonlaInfo {client} />
			</div>
		</div>
	</TabItem>
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
	<TabItem open={isOpen('documents')}>
		<div slot="title" class="flex items-center gap-2">
			<FileCopyAltOutline size="md" />
			Documents
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<Documents />
		</div>
	</TabItem>
	<TabItem open={isOpen('security')}>
		<div slot="title" class="flex items-center gap-2">
			<FingerprintOutline size="md" />
			Security
		</div>
		<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
			<PasswordInfo />
			<Sessions />
		</div>
	</TabItem>
	<TabItem open={isOpen('alerts')}>
		<div slot="title" class="flex items-center gap-2">
			<BellActiveAltOutline size="md" />
			Notification Preferences
		</div>
		<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
			<Alerts />
			<Emails />
		</div>
	</TabItem>
</Tabs>
