<script lang="ts">
	import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';
	import { humanize } from '$lib/utils/strings';
	import { SignOut } from '@auth/sveltekit/components';
	
	export let name: string = ''; 
	export let avatar: string = ''; 
	export let email: string = '';
	
</script>

<button class="ms-3 rounded-full ring-gray-400 focus:ring-4 dark:ring-gray-600">
	<Avatar size="sm" src={avatar} tabindex={0} />
</button>
<Dropdown placement="bottom-end">
	<DropdownHeader>
		<span class="block text-sm">{humanize(name ?? 'Unknown')}</span>
		<span class="block truncate text-sm font-medium">{email}</span>
	</DropdownHeader>
	<DropdownItem href="/dashboard">Dashboard</DropdownItem>
	<DropdownItem href="/settings">Settings</DropdownItem>
	<DropdownDivider />
	<DropdownItem><SignOut options={{ redirect: true, redirectTo: "/signin" }}>
		<div slot="submitButton" class="buttonPrimary">Sign out</div>
	</SignOut>
</DropdownItem>
</Dropdown>
