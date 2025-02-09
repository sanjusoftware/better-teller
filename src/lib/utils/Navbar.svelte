<script lang="ts">
	import {
		Avatar,
		Button,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from 'flowbite-svelte';
	import {
		BellRingSolid,
		BuildingOutline,
		ChartMixedDollarOutline,
		ChartPieOutline,
		ChevronDownOutline,
		ChevronRightOutline,
		CreditCardOutline,
		CreditCardPlusAltOutline,
		GlobeOutline,
		GridOutline,
		HomeOutline,
		LandmarkOutline,
		LayersOutline,
		LifeSaverOutline,
		LightbulbOutline,
		MapPinOutline,
		MobilePhoneOutline,
		PlusOutline,
		QrCodeOutline,
		UserOutline,
		UsersGroupOutline
	} from 'flowbite-svelte-icons';

	import { page } from '$app/state';
	let activeUrl = $derived(page.url.pathname);
	let loggedIn: boolean = page.data.loggedIn;
	let clientsOpen = $state(false);
	let productsOpen = $state(false);
	let paymentsOpen = $state(false);

</script>

<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
	<NavBrand href="/" class="flex items-center justify-between mr-4">
		<img src="/images/dsk.svg" class="me-3 h-6 sm:h-9" alt="DSK Logo" />
		<span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
			Better Teller
		</span>
	</NavBrand>
	<NavHamburger />
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
					Clients<ChevronDownOutline class="w-6 h-6 text-primary-800 dark:text-white inline" />
				</div>
			</NavLi>
			<Dropdown class="w-44 z-20" {activeUrl} bind:open={clientsOpen}>
				<DropdownItem href="/clients/retail" on:click={() => (clientsOpen = false)}>
					<div class="flex items-center gap-2">
						<UserOutline size="md" />Individual
					</div>
				</DropdownItem>
				<DropdownItem href="/clients/sme" on:click={() => (clientsOpen = false)}>
					<div class="flex items-center gap-2">
						<UsersGroupOutline size="md" />SME
					</div>
				</DropdownItem>
				<DropdownItem href="/clients/corporate" on:click={() => (clientsOpen = false)}>
					<div class="flex items-center gap-2">
						<BuildingOutline size="md" />Corporate
					</div>
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/clients/retail/new" on:click={() => (clientsOpen = false)}>
					<div class="flex items-center gap-2">
						<PlusOutline size="xs" />
						<UserOutline size="md" />Add Individual
					</div>
				</DropdownItem>
				<DropdownItem href="/clients/sme/new" on:click={() => (clientsOpen = false)}>
					<div class="flex items-center gap-2">
						<PlusOutline size="xs" />
						<UsersGroupOutline size="md" />Add SME
					</div>
				</DropdownItem>
				<DropdownItem href="/clients/corporate/new" on:click={() => (clientsOpen = false)}>
					<div class="flex items-center gap-2">
						<PlusOutline size="xs" />
						<BuildingOutline size="md" />Add Corporate
					</div>
				</DropdownItem>
			</Dropdown>
			<NavLi class="cursor-pointer">
				<div class="flex items-center gap-2">
					<GridOutline size="md" />
					Products<ChevronDownOutline class="w-6 h-6 text-primary-800 dark:text-white inline" />
				</div>
			</NavLi>
			<Dropdown class="w-44 z-20" {activeUrl} bind:open={productsOpen}>
				<DropdownItem href="/products/casa" on:click={() => (productsOpen = false)}>
					<div class="flex items-center gap-2">
						<QrCodeOutline size="md" />Smart Accounts
					</div>
				</DropdownItem>
				<DropdownItem href="/products/card" on:click={() => (productsOpen = false)}>
					<div class="flex items-center gap-2">
						<CreditCardPlusAltOutline size="md" />Cards
					</div>
				</DropdownItem>
				<DropdownItem href="/products/loan" on:click={() => (productsOpen = false)}>
					<div class="flex items-center gap-2">
						<ChartMixedDollarOutline size="md" />loans
					</div>
				</DropdownItem>
			</Dropdown>
			<NavLi class="cursor-pointer">
				<div class="flex items-center gap-2">
					<LayersOutline size="md" />
					Payments<ChevronDownOutline class="w-6 h-6 text-primary-800 dark:text-white inline" />
				</div>
			</NavLi>
			<Dropdown class="w-44 z-20" {activeUrl} bind:open={paymentsOpen}>
				<DropdownItem class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<HomeOutline size="md" />Utilities
						<ChevronRightOutline class="w-6 h-6 ms-2 text-primary-700 dark:text-white" />
					</div>
				</DropdownItem>
				<Dropdown placement="right-start">
					<DropdownItem href="/payments/electricity" on:click={() => (paymentsOpen = false)}>
						<div class="flex items-center gap-2">
							<LightbulbOutline size="md" />Electricity
						</div>
					</DropdownItem>
					<DropdownItem href="/payments/water" on:click={() => (paymentsOpen = false)}>
						<div class="flex items-center gap-2">
							<MapPinOutline size="md" />Water
						</div>
					</DropdownItem>
					<DropdownItem href="/payments/gas" on:click={() => (paymentsOpen = false)}>
						<div class="flex items-center gap-2">
							<GlobeOutline size="md" />Intenet
						</div>
					</DropdownItem>
					<DropdownItem href="/payments/phone" on:click={() => (paymentsOpen = false)}>
						<div class="flex items-center gap-2">
							<MobilePhoneOutline size="md" />Phone
						</div>
					</DropdownItem>
					<DropdownItem href="/payments/municipality" on:click={() => (paymentsOpen = false)}>
						<div class="flex items-center gap-2">
							<LandmarkOutline size="md" />Municipality
						</div>						
					</DropdownItem>
				</Dropdown>
				<DropdownDivider />
				<DropdownItem href="/payments/card" on:click={() => (paymentsOpen = false)}>
					<div class="flex items-center gap-2">
						<CreditCardOutline size="md" />Card Payments
					</div>
				</DropdownItem>
				<DropdownItem href="/payments/fees" on:click={() => (paymentsOpen = false)}>
					<div class="flex items-center gap-2">
						<CreditCardOutline size="md" />Collage Fees
					</div>
				</DropdownItem>
				<DropdownItem href="/products/loan" on:click={() => (paymentsOpen = false)}>
					<div class="flex items-center gap-2">
						<ChartMixedDollarOutline size="md" />Loan Payments
					</div>
				</DropdownItem>
			</Dropdown>
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
