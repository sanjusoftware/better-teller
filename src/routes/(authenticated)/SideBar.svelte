<script>
	import {
		UsersGroupSolid,
		ChartPieSolid,
		MailBoxOutline,
		DollarOutline,
		CreditCardOutline,
		HomeOutline,
		FileLinesOutline,
		LifeSaverSolid,
		UserSettingsSolid,
		AdjustmentsVerticalSolid
	} from 'flowbite-svelte-icons';

	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownWrapper,
		SidebarDropdownItem
	} from 'flowbite-svelte';

	import { page } from '$app/state';
	$: activeUrl = page.url.pathname;
	let spanClass = 'flex-1 ms-3 whitespace-nowrap font-medium';
	let activeClass =
		'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
	let nonActiveClass =
		'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';
</script>

<!-- Sidebar -->
<Sidebar
	{activeUrl}
	{activeClass}
	{nonActiveClass}
	id="drawer-navigation"
	class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
>
	<SidebarWrapper class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
		<SidebarGroup>
			<SidebarItem label="Dashboard" href="/dashboard" class="font-medium">
				<svelte:fragment slot="icon">
					<ChartPieSolid
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>
			<SidebarDropdownWrapper label="Clients" class="font-medium">
				<svelte:fragment slot="icon">
					<UsersGroupSolid
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
				<SidebarDropdownItem
					label="Retail"
					href="/clients/retail"
					active={activeUrl === '/clients/retail'}
				/>
				<SidebarDropdownItem
					label="SME"
					href="/clients/sme"
					active={activeUrl === '/clients/sme'}
				/>
				<SidebarDropdownItem
					label="Corporate"
					href="/clients/corporate"
					active={activeUrl === '/clients/corporate'}
				/>
			</SidebarDropdownWrapper>
			<SidebarItem label="Tasks" href="/tasks" {spanClass}>
				<svelte:fragment slot="icon">
					<MailBoxOutline
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
				<svelte:fragment slot="subtext">
					<span
						class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"
					>
						3
					</span>
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Transactions" href="/transactions" class="font-medium">
				<svelte:fragment slot="icon">
					<DollarOutline
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Cards" href="/cards" class="font-medium">
				<svelte:fragment slot="icon">
					<CreditCardOutline
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Mortgages" href="/mortgage" class="font-medium">
				<svelte:fragment slot="icon">
					<HomeOutline
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
		<SidebarGroup border>
			<SidebarItem label="Documents" href="/documents" class="font-medium">
				<svelte:fragment slot="icon">
					<FileLinesOutline
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Help">
				<svelte:fragment slot="icon">
					<LifeSaverSolid
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
	<div
		class="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20"
	>
		<a
			href="/"
			data-tooltip-target="tooltip-configurations"
			class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
			aria-label="Product Configurations"
		>
			<AdjustmentsVerticalSolid
				class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
			/>
		</a>
		<div
			id="tooltip-configurations"
			role="tooltip"
			class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
		>
			Product Configurations
			<div class="tooltip-arrow" data-popper-arrow></div>
		</div>
		<a
			href="/"
			data-tooltip-target="tooltip-settings"
			class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
			aria-label="Settings"
		>
			<UserSettingsSolid
				class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
			/>
		</a>
		<div
			id="tooltip-settings"
			role="tooltip"
			class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
		>
			Settings
			<div class="tooltip-arrow" data-popper-arrow></div>
		</div>
		<button
			type="button"
			data-dropdown-toggle="language-dropdown"
			class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
			aria-label="Language"
		>
			<span class="fi fi-us h-5 w-5 mt-0.5"></span>
		</button>
		<!-- Language Dropdown -->
		<div
			class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
			id="language-dropdown"
		>
			<ul class="py-1" role="none">
				<li>
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
				</li>
				<li>
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
				</li>
			</ul>
		</div>
	</div>
</Sidebar>
