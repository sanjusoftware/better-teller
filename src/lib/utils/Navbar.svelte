<script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';	
	import Notifications from './NotificationList.svelte';
	import AppsMenu from './AppsMenu.svelte';
	import UserMenu from './UserMenu.svelte';
	import {
	Button,
		DarkMode,
		Dropdown,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar,
		Search
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	let user = page.data.session?.user;

	let fluid = $state(true);
	let {drawerHidden = false} = $props();
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
	{#if user}
		<div class="hidden lg:block lg:ps-3">
			{#if list}
				<NavUl class="ml-2" activeUrl="/" activeClass="text-primary-600 dark:text-primary-500">
					<NavLi href="/">Home</NavLi>
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
			{:else}
				<form>
					<Search size="md" class="mt-1 w-96 border focus:outline-none" />
				</form>
			{/if}
		</div>
		<div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
			<Button
 				id="languages-list"
 				color="none"
 				class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
 			>
 				<span class="fi fi-us h-5 w-5 mt-0.5"></span>
 			</Button>
			<Notifications />
			<AppsMenu />
			<DarkMode />
			<UserMenu name={user?.name ?? ''} avatar={user?.image ?? ''} email={user?.email ?? ''} />
		</div>		
		<Dropdown placement="bottom" triggeredBy="#languages-list">
			<DropdownItem>
				<a
					href="/"
					class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
					role="menuitem"
				>
					<div class="inline-flex items-center">
						<span class="fi fi-us h-3.5 w-3.5 mr-2"></span>
						English (US)
					</div>
				</a>
			</DropdownItem>
			<DropdownItem>
				<a
					href="/"
					class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
					role="menuitem"
				>
					<div class="inline-flex items-center">
						<span class="fi fi-bg h-3.5 w-3.5 mr-2"></span>
						Bulgarian
					</div>
				</a>
			</DropdownItem>
		</Dropdown>
	{/if}
</Navbar>
