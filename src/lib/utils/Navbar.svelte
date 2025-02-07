<script lang="ts">
	import {
		NavBrand,
		Navbar,
		NavHamburger,
		NavUl,
		NavLi,
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		DropdownDivider,
		Button
	} from 'flowbite-svelte';
	import {
		BarcodeOutline,
		BellRingSolid,
		ChartPieOutline,
		ChevronDownOutline,
		FolderDuplicateOutline,
		GridOutline,
		LifeSaverOutline,
		UserAddOutline,
		UsersGroupOutline
	} from 'flowbite-svelte-icons';

	import { page } from '$app/state';
	$: activeUrl = page.url.pathname;

	export let loggedIn = false;
</script>

<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
	<NavBrand href="/" class="flex items-center justify-between mr-4">
		<img src="/images/dsk.svg" class="me-3 h-6 sm:h-9" alt="DSK Logo" />
		<span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
			Better Teller
		</span>
	</NavBrand>

	{#if loggedIn}
		<NavUl {activeUrl}>
			<NavLi href="/dashboard">
				<div class="flex items-center gap-2">
					<ChartPieOutline size="md" />
					Dashboard
				</div>
			</NavLi>
			<NavLi class="cursor-pointer">
				<div class="flex items-center gap-2">
					<UsersGroupOutline size="md" />
					Clients<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
				</div>
			</NavLi>
			<Dropdown class="w-44 z-20">
				<DropdownItem href="/clients/retail">Retail</DropdownItem>
				<DropdownItem href="/clients/sme">SME</DropdownItem>
				<DropdownItem href="/clients/corporate">Corporate</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/clients/retail/new">
					<div class="flex items-center gap-2">
						<UserAddOutline size="md" />Retail Client
					</div>
				</DropdownItem>
				<DropdownItem href="/clients/sme/new">
					<div class="flex items-center gap-2">
						<UserAddOutline size="md" />SME Client
					</div>
				</DropdownItem>
				<DropdownItem href="/clients/corporate/new">
					<div class="flex items-center gap-2">
						<UserAddOutline size="md" />Corporate Client
					</div>
				</DropdownItem>
			</Dropdown>
			<NavLi class="cursor-pointer">
				<div class="flex items-center gap-2">
					<GridOutline size="md" />
					Products<ChevronDownOutline
						class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
					/>
				</div>
			</NavLi>
			<Dropdown class="w-44 z-20">
				<DropdownItem href="/products/casa">Smart Accounts</DropdownItem>
				<DropdownItem href="/products/card">Credit Cards</DropdownItem>
				<DropdownItem href="/products/loan">Loans</DropdownItem>
			</Dropdown>
			<NavLi href="/transactions">
				<div class="flex items-center gap-2">
					<BarcodeOutline size="md" />
					Transactions
				</div>
			</NavLi>
			<NavLi href="/documents">
				<div class="flex items-center gap-2">
					<FolderDuplicateOutline size="md" />
					Documents
				</div>
			</NavLi>
			<NavLi href="/help">
				<div class="flex items-center gap-2">
					<LifeSaverOutline size="md" />
					Help
				</div>
			</NavLi>
		</NavUl>

		<div class="flex items-center md:order-2">
			<Button
				id="languages-list"
				color="none"
				class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
			>
				<span class="fi fi-us h-5 w-5 mt-0.5"></span>
			</Button>
			<Button
				id="notifications-list"
				color="none"
				class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
			>
				<BellRingSolid class="w-6 h-6" />
			</Button>
			<div class="mx-2"></div>
			<Avatar id="avatar-menu" src="/images/profile.jpg" href="#" class="w-8 h-8" />
			<NavHamburger />
		</div>

		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">Sanjeev Mishra</span>
				<span class="block truncate text-sm font-medium">sanjeev.mishra@dskbank.bg</span>
			</DropdownHeader>
			<DropdownItem href="/dashboard">Dashboard</DropdownItem>
			<DropdownItem href="/settings">Settings</DropdownItem>
			<DropdownDivider />
			<DropdownItem>
				<form method="POST" action="/logout">
					<button>Sign out</button>
				</form>
			</DropdownItem>
		</Dropdown>
		<Dropdown placement="bottom" triggeredBy="#notifications-list">
			<DropdownHeader>
				<span class="block text-md">Notifications</span>
			</DropdownHeader>
			<DropdownItem>Notification 1</DropdownItem>
			<DropdownItem>Notification 2</DropdownItem>
			<DropdownItem>Notification 3</DropdownItem>
			<DropdownDivider />
			<DropdownItem class="text-center" href="/notifcations">View All</DropdownItem>
		</Dropdown>
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
