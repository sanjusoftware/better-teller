<script lang="ts">
	import { page } from '$app/state';	
	import {
		Alert,
		DarkMode,
		Dropdown,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import CompleteService from '../../routes/(authenticated)/dashboard/CompleteService.svelte';
	import Languages from './LanguageList.svelte';
	import Notifications from './NotificationList.svelte';
	import UserMenu from './UserMenu.svelte';

	let user = page.data.session?.user;
	let fluid = $state(true);
	let { drawerHidden = false } = $props();
	let list = $state(false);
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
	{#if page.form?.success && page.form.message}
		<div class="absolute inset-x-0 mx-auto flex justify-center">
			<Alert color="green" dismissable>
				{page.form.message}
			</Alert>
		</div>
	{/if}

	{#if user}
		<div class="hidden lg:block lg:ps-3">
			{#if list}
				<NavUl class="ml-2" activeUrl="/" activeClass="text-primary-600 dark:text-primary-500">
					<NavLi href="/dashboard">Home</NavLi>
					<NavLi href="#top">Messages</NavLi>
					<NavLi href="#top">Profile</NavLi>
					<NavLi href="#top">Settings</NavLi>
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
		<div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
			<Languages />
			<Notifications />
			<!-- <AppsMenu /> -->
			<DarkMode />
			<UserMenu name={user?.name ?? ''} avatar={user?.image ?? ''} email={user?.email ?? ''} />
				<CompleteService />
		</div>
	{/if}
</Navbar>
