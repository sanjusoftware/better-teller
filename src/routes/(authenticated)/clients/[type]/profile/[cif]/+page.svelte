<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Tabs, TabItem } from 'flowbite-svelte';
  import { UserCircleSolid, GridSolid, AdjustmentsVerticalSolid, LockOpenOutline, DollarOutline, FilterDollarSolid, FilterDollarOutline, CreditCardPlusAltSolid, CreditCardSolid, CreditCardOutline, UserCircleOutline, EuroOutline, ProfileCardOutline, FileInvoiceOutline } from 'flowbite-svelte-icons';

	import Accounts from './Accounts.svelte';
	import ProfilePicture from './ProfilePicture.svelte';
	import Alerts from "./Alerts.svelte";
	import Emails from './Emails.svelte';
	import PersonlaInfo from './PersonalInfo.svelte';
	import LanguageTime from './LanguageTime.svelte';
	import PasswordInfo from './PasswordInfo.svelte';
	import Sessions from './Sessions.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let client = data.client;
</script>

<main class="p-4">
	<div class="col-span-full xl:mb-0">
		<Breadcrumb class="mb-6">
			<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
			<BreadcrumbItem href="/clients/{client.type}">
				{client.type.toLocaleUpperCase()} Clients
			</BreadcrumbItem>
			<BreadcrumbItem>{client.name}</BreadcrumbItem>
		</Breadcrumb>
	</div>
	<Tabs tabStyle="underline">
		<TabItem open>
		  <div slot="title" class="flex items-center gap-2">
			<ProfileCardOutline size="md" />
			Profile
		  </div>
		  <div class="grid grid-cols-2 space-y-2 dark:bg-gray-900 xl:grid-cols-3 xl:gap-3.5">
			<div class="col-span-full space-y-4 xl:col-auto">
				<ProfilePicture client={client} />
				<LanguageTime />
			</div>
			<div class="col-span-2 space-y-4">
				<PersonlaInfo />
			</div>
		  </div>
		</TabItem>
		<TabItem>
		  <div slot="title" class="flex items-center gap-2">
			<FileInvoiceOutline size="md" />
			Accounts
		  </div>
		  <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
			<Accounts />
			<PersonlaInfo />
		  </div>
		</TabItem>
		<TabItem>
			<div slot="title" class="flex items-center gap-2">
			  <CreditCardOutline size="md" />
			  Cards
			</div>
			<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
			  <Accounts />
			  <PersonlaInfo />
			</div>
		  </TabItem>  
		<TabItem>
		  <div slot="title" class="flex items-center gap-2">
			<EuroOutline size="md" />
			Loans
		  </div>
		  <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
			<Accounts />
			<PersonlaInfo />
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
			<AdjustmentsVerticalSolid size="md" />
			Settings
		  </div>
		  <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
			<Alerts />
			<Emails />
		  </div>
		</TabItem>
	  </Tabs>
</main>
