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

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let client = data.client ?? {
		cif: '',
		name: '',
		avatar: '',
		email: '',
		biography: '',
		position: '',
		country: '',
		status: '',
		type: '',
		phone: '',
		id_card_back_image: '',
		id_card_front_image:''
	};
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem href={`/clients/${client.type}`}>
		{client.type.toLocaleUpperCase()} Clients
	</BreadcrumbItem>
	<BreadcrumbItem>{client.name}</BreadcrumbItem>
</Breadcrumb>

<Tabs tabStyle="underline" contentClass="p-2 bg-white rounded-lg dark:bg-gray-800">
	<TabItem open>
		<div slot="title" class="flex items-center gap-2">
			<ProfileCardOutline size="md" />
			Profile
		</div>
		<div class="grid grid-cols-2 dark:bg-gray-900 xl:grid-cols-2 xl:gap-3.5">
			<div class="space-y-4">
				<IDDcoument IDForntImage={client.id_card_front_image} IDBackImage={client.id_card_back_image} />
			</div>
			<div class="space-y-4">
				<PersonlaInfo {client} />
			</div>
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<WalletOutline size="md" />
			Accounts
		</div>
		<Accounts {data} />
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<CreditCardOutline size="md" />
			Cards
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<BankCards {data} />
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<ChartMixedDollarOutline size="md" />
			Loans
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<Loans {data} />
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<FileCopyAltOutline size="md" />
			Documents
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<Documents {data} />
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<FingerprintOutline size="md" />
			Security
		</div>
		<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
			<PasswordInfo />
			<Sessions />
		</div>
	</TabItem>
	<TabItem>
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
