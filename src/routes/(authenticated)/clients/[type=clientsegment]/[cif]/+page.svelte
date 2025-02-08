<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Tabs, TabItem } from 'flowbite-svelte';
	import {
		LockOpenOutline,
		CreditCardOutline,
		ProfileCardOutline,
		BellActiveAltOutline,
		ChartMixedDollarOutline,
		WalletOutline,
		FileCopyAltOutline
	} from 'flowbite-svelte-icons';

	import Accounts from './Accounts.svelte';
	import BankCards from './BankCards.svelte';
	import Loans from './Loans.svelte';
	import Documents from './Documents.svelte';
	import ProfilePicture from './ProfilePicture.svelte';
	import Alerts from './Alerts.svelte';
	import Emails from './Emails.svelte';
	import PersonlaInfo from './PersonalInfo.svelte';
	import LanguageTime from './LanguageTime.svelte';
	import PasswordInfo from './PasswordInfo.svelte';
	import Sessions from './Sessions.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let client = data.client ?? {
		id: 0,
		name: '',
		avatar: '',
		email: '',
		biography: '',
		position: '',
		country: '',
		status: '',
		type: '',
		phone: ''
	};
	let bankcards = data.Cards;
	let loans = data.Loans;
	let documents = data.Documents;
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Clients</BreadcrumbItem>
	<BreadcrumbItem href={`/clients/${client.type}`}>
		{client.type.toLocaleUpperCase()} Clients
	</BreadcrumbItem>
	<BreadcrumbItem>{client.name}</BreadcrumbItem>
</Breadcrumb>
<Tabs tabStyle="underline" contentClass="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
	<TabItem open>
		<div slot="title" class="flex items-center gap-2">
			<ProfileCardOutline size="md" />
			Profile
		</div>
		<div class="grid grid-cols-2 dark:bg-gray-900 xl:grid-cols-3 xl:gap-3.5">
			<div class="col-span-full space-y-4 xl:col-auto">
				<ProfilePicture {client} />
				<LanguageTime />
			</div>
			<div class="col-span-2 space-y-4">
				<PersonlaInfo />
			</div>
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<WalletOutline size="md" />
			Accounts
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<Accounts {data} />
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<CreditCardOutline size="md" />
			Cards
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<BankCards {bankcards} />
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<ChartMixedDollarOutline size="md" />
			Loans
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<Loans {loans} />
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<FileCopyAltOutline size="md" />
			Documents
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<Documents {documents} />
		</div>
	</TabItem>
	<TabItem>
		<div slot="title" class="flex items-center gap-2">
			<LockOpenOutline size="md" />
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
