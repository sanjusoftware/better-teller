<script lang="ts">
	import Settings from './UserSettings.svelte';
	import Profile from './UserProfile.svelte';
	import MetaTag from '$lib/utils/MetaTag.svelte';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let user = data.session.user

	let personalPreferences = [
		{
			title: 'Dark Mode',
			subtitle: 'Prefer dark mode for this application',
			active: false
		},
		{
			title: 'ID Scanner',
			subtitle: 'I have ID scanner attached to my workstation',
			active: true
		},
		{
			title: 'Printer',
			subtitle: 'I have Printer attached to my workstation',
			active: false
		},
		{
			title: 'Cash Drawer',
			subtitle: 'I have Cash Drawer attached to my workstation',
			active: true
		}
	];

	const settingsPath: string = '/settings';
	const description: string = 'User Settings';
	const title: string = 'Better Teller - Manage Settings';
	const subtitle: string = 'Manage Settings';
</script>

<MetaTag path={settingsPath} {description} {title} {subtitle} />

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem href={settingsPath}>My Settings</BreadcrumbItem>
</Breadcrumb>
<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
	<Profile {user}/>
	<Settings items={personalPreferences} />
</div>
