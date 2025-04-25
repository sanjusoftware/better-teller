<script lang="ts">
	import {
		Avatar,
		Button,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem
	} from 'flowbite-svelte';
	import { humanize } from '$lib/utils/strings';
	import { SignOut } from '@auth/sveltekit/components';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	export let name: string = '';
	export let avatar: string = '';
	export let email: string = '';
</script>

<div class="flex items-center space-x-4 rtl:space-x-reverse">
	<Avatar src={avatar} size="sm" />
	<div class="text-sm text-black font-bold dark:text-white">
		<div>{humanize(name)}</div>
		<div class="text-sm font-normal text-gray-500 dark:text-gray-400">Teller</div>
	</div>
</div>
<ChevronDownOutline id="user-menu" size="xl" color="green" class="mt-1 dark:text-white hover:cursor-pointer" />
<Dropdown placement="bottom-end" triggeredBy="#user-menu">
	<DropdownHeader>
		<span class="block text-sm">{humanize(name ?? 'Unknown')}</span>
		<span class="block truncate text-sm font-medium">{email}</span>
	</DropdownHeader>
	<DropdownItem href="/dashboard">Dashboard</DropdownItem>
	<DropdownItem href="/settings">Settings</DropdownItem>
	<DropdownDivider />
	<DropdownItem>
		<SignOut options={{ redirect: true, redirectTo: '/signin' }}>
			<div slot="submitButton" class="buttonPrimary">Sign out</div>
		</SignOut>
	</DropdownItem>
</Dropdown>
