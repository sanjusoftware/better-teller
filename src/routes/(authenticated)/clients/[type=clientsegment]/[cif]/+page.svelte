<script lang="ts">
	import { TabItem, Tabs } from 'flowbite-svelte';
	import {
		BellActiveAltOutline,
		FileCopyAltOutline,
		FingerprintOutline
	} from 'flowbite-svelte-icons';

	import { page } from '$app/state';
	import Alerts from './Alerts.svelte';
	import Documents from './Documents.svelte';
	import Emails from './Emails.svelte';
	import PasswordInfo from './PasswordInfo.svelte';
	import Sessions from './Sessions.svelte';
	import { _ } from 'svelte-i18n';

	let {client, open} = $derived(page.data);
	const tabs = ['identity', 'cards', 'accounts', 'loans', 'documents', 'security', 'alerts'];
	const openTab = $derived(open ? (tabs.includes(open) ? open : 'identity') : 'identity');

	function isOpen(tabName: string): boolean {
		return tabName === openTab;
	}
</script>

<Tabs tabStyle="full" contentClass="p-2 bg-white dark:bg-gray-800" defaultClass="flex rounded-lg divide-x rtl:divide-x-reverse divide-gray-200 shadow-sm dark:divide-gray-700">
	<!-- <TabItem open={isOpen('identity')}>
		<div slot="title" class="flex items-center gap-2">
			<ProfileCardOutline size="md" />
			ID Document
		</div>
		<div class="grid grid-cols-7 dark:bg-gray-900 xl:grid-cols-7 xl:gap-3.5">
			<div class="space-y-4 col-span-3">
				<IDCard
					IDForntImage={client.id_card_front_image}
					IDBackImage={client.id_card_back_image}
				/>
			</div>
			<div class="space-y-4 col-span-4">
				<PersonlaInfo {client} />
			</div>
		</div>
	</TabItem> -->
	<TabItem open={isOpen('documents')}>
		<div slot="title" class="flex items-center gap-2">
			<FileCopyAltOutline size="md" />
			{$_('clients.details.tabs.documents')}
		</div>
		<div class="grid gap-4 xl:grid-cols-1 xl:gap-4">
			<Documents />
		</div>
	</TabItem>
	<TabItem open={isOpen('security')}>
		<div slot="title" class="flex items-center gap-2">
			<FingerprintOutline size="md" />
			{$_('clients.details.tabs.security')}
		</div>
		<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
			<PasswordInfo />
			<Sessions />
		</div>
	</TabItem>
	<TabItem open={isOpen('alerts')}>
		<div slot="title" class="flex items-center gap-2">
			<BellActiveAltOutline size="md" />
			{$_('clients.details.tabs.notificationPreferences')}
		</div>
		<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
			<Alerts />
			<Emails />
		</div>
	</TabItem>
</Tabs>
