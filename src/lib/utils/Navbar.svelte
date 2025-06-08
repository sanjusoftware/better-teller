<script lang="ts">
	import { page } from '$app/state';
	import {
		Alert,
		Dropdown,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { getFlash } from 'sveltekit-flash-message';
	import CurrentClient from '../../routes/(authenticated)/dashboard/CurrentClient.svelte';
	import Notifications from './NotificationList.svelte';
	import UserMenu from './UserMenu.svelte';
	import UserSettings from './UserSettings.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte'; // Import the new component
	import { _ } from 'svelte-i18n';

	let user = page.data.session?.user;
	let fluid = $state(true);
	let { drawerHidden = false } = $props();
	let list = $state(false);
	const flash = getFlash(page);
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
	<NavHamburger
		onClick={() => (drawerHidden = !drawerHidden)}
		class="m-0 me-3 md:block lg:hidden"
	/>
	<NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
		<img src="/images/dsk.svg" class="me-2.5 h-6 sm:h-8" alt="DSK Logo" />
		<span
			class="ml-px self-center whitespace-nowrap text-l font-semibold dark:text-white sm:text-xl"
		>
			BetterTeller
		</span>
	</NavBrand>
	{#if (page.form?.success || page.form?.error) && page.form.message}
		<div class="absolute inset-x-0 mx-auto flex justify-center">
			<Alert color={page.form?.success ? 'green' : 'red'} dismissable>
				{page.form.message}
			</Alert>
		</div>
	{/if}
	{#if $flash}
		{@const bg = $flash.type == 'success' ? 'green' : 'red'}
		<div class="absolute inset-x-0 mx-auto flex justify-center">
			<Alert color={bg} dismissable>
				{$flash.message}
			</Alert>
		</div>
	{/if}

	{#if user}
		<div class="hidden lg:block lg:ps-3">
			{#if list}
				<NavUl class="ml-2" activeUrl="/" activeClass="text-primary-600 dark:text-primary-500">
					<NavLi href="/dashboard">{$_('navbar.dashboard')}</NavLi>
					<NavLi href="#top">Messages</NavLi> 
					<NavLi href="#top">Profile</NavLi>
					<NavLi href="#top">{$_('navbar.settings')}</NavLi>
					<NavLi class="cursor-pointer">
						Dropdown
						<ChevronDownOutline class="ms-0 inline" />
					</NavLi>
					<Dropdown class="z-20 w-44">
						<DropdownItem href="#top">Item 1</DropdownItem>
						<DropdownItem href="#top">Item 2</DropdownItem>
						<DropdownItem href="#top">Item 3</DropdownItem>
					</Dropdown>
				</NavUl>
			{/if}
		</div>
		<div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2 space-x-3">
			<LanguageSwitcher />
			<CurrentClient />
			<UserMenu name={user?.name ?? ''} avatar={user?.image ?? ''} email={user?.email ?? ''} />
			<Notifications />
			<UserSettings/>
		</div>
	{/if}
</Navbar>
