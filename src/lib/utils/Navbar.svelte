<script lang="ts">
	import { page } from '$app/state';
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
	import '../../app.css';
	import AppsMenu from './AppsMenu.svelte';
	import Languages from './LanguageList.svelte';
	import Notifications from './NotificationList.svelte';
	import UserMenu from './UserMenu.svelte';

	let user = page.data.session?.user;
	let currentClient = page.data.current_client;
	console.log('currentclient is:', currentClient);


	let fluid = $state(true);
	let { drawerHidden = false } = $props();
	let list = $state(false);
	let selectedItem = $state('Clients');
	const searchableItems = [
		{
			label: 'Clients', placeholder: 'Search CIF, EGN, Mobile'
		},
		{
			label: 'Transactions', placeholder: 'Search Transaction reference'
		},
		{
			label: 'Accounts', placeholder: 'Search Account Number'
		},
		{
			label: 'Products', placeholder: 'Search Product Name'
		}
	];
	let searchPlaceholder = $derived(searchableItems.find((item) => item.label === selectedItem)?.placeholder)
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
			{:else}
				<form class="flex">
					<div class="relative">
						<Button class="rounded-e-none whitespace-nowrap border border-e-0 border-primary-700">
							{selectedItem}
							<ChevronDownOutline class="w-2.5 h-2.5 ms-2.5" />
						</Button>
						<Dropdown classContainer="w-40">
							{#each searchableItems as { label }}
								<DropdownItem
									on:click={() => {
										selectedItem = label;
									}}
									class={selectedItem === label ? 'underline' : ''}
								>
									{label}
								</DropdownItem>
							{/each}
						</Dropdown>
					</div>
					<Search size="md" class="rounded-s-none w-96 border focus:outline-none" placeholder={searchPlaceholder} />
				</form>
			{/if}
		</div>
		<div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
			{#if currentClient}
				<Button pill color="red" size="xs" class="px-3">Complete Service</Button>
			{/if}
			<Languages />
			<Notifications />
			<AppsMenu />
			<DarkMode />
			<UserMenu name={user?.name ?? ''} avatar={user?.image ?? ''} email={user?.email ?? ''} />
		</div>
	{/if}
</Navbar>
