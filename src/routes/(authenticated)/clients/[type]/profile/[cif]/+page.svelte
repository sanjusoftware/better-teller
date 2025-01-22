<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading } from 'flowbite-svelte';
	import Accounts from './Accounts.svelte';
	import ProfilePicture from './ProfilePicture.svelte';

	import Alerts from "./Alerts.svelte";
	import Emails from './Emails.svelte';
	import GeneralInfo from './GeneralInfo.svelte';
	import LanguageTime from './LanguageTime.svelte';
	import PasswordInfo from './PasswordInfo.svelte';
	import Sessions from './Sessions.svelte';
	import SocialAccounts from './SocialAccounts.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let client = data.client;
</script>

<main class="p-4">
	<div class="grid grid-cols-1 space-y-2 dark:bg-gray-900 xl:grid-cols-3 xl:gap-3.5">
		<div class="col-span-full xl:mb-0">
			<Breadcrumb class="mb-6">
				<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
				<BreadcrumbItem href="/clients/{client.type}">
					{client.type.toLocaleUpperCase()} Clients
				</BreadcrumbItem>
				<BreadcrumbItem>Profile</BreadcrumbItem>
			</Breadcrumb>

			<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
				{client.name}'s Profile
			</Heading>
		</div>
		<div class="col-span-full space-y-4 xl:col-auto">
			<ProfilePicture client={client} />
			<LanguageTime />
			<SocialAccounts />
			<Accounts />
		</div>
		<div class="col-span-2 space-y-4">
			<GeneralInfo />
			<PasswordInfo />
			<Sessions />
		</div>
	</div>
	<div class="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
		<Alerts />
		<Emails />
	</div>
</main>
