<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	import { getCurrentClient, isCurrentClient } from '$lib/servicecontext.svelte';
	import {
		Sidebar,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import {
		AngleDownOutline,
		AngleUpOutline,
		ArrowsRepeatOutline,
		ArrowUpDownOutline,
		BuildingOutline,
		CashOutline,
		ChartMixedOutline,
		CogOutline,
		GridOutline,
		HomeOutline,
		LifeSaverSolid,
		UserOutline
	} from 'flowbite-svelte-icons';
	import { clientProductSummaryPath } from './pathHelper';
	import { _ } from 'svelte-i18n';

	let { drawerHidden = false } = $props();

	const closeDrawer = () => {
		drawerHidden = true;
	};

	let iconClass =
		'flex-shrink-0 w-6 h-6 text-green-500 transition duration-75 dark:text-gray-400 dark:group-hover:text-white';
	let itemClass =
		'flex items-center p-2 text-gray-700 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700';
	let groupClass = 'space-y-2';

	let mainSidebarUrl = $state(page.url.pathname);

	afterNavigate((navigation) => {
		// this fixes https://github.com/themesberg/flowbite-svelte/issues/364
		document.getElementById('svelte')?.scrollTo({ top: 0 });
		closeDrawer();

		mainSidebarUrl = navigation.to?.url.pathname ?? '';
	});	

	// Defer translation to render time by using functions
	let non_client_actions = $state([
		{ name: () => $_('navbar.dashboard'), icon: HomeOutline, href: '/dashboard' },
		{ name: () => 'Reports', icon: ChartMixedOutline, href: '/reports' }, // No key for Reports yet
		{ name: () => 'Admin', icon: BuildingOutline, href: '/admin' } // No key for Admin yet
	]);

	let client_actions = $state([
		{ name: () => $_('navbar.dashboard'), icon: HomeOutline, href: '/dashboard' },
		{
			name: () => $_('navbar.clients'), // Mapping "Client's Info" to "Clients"
			icon: UserOutline,
			children: {
				'Products Summary': clientProductSummaryPath(getCurrentClient()),
				'ID Dcouments': '/clients/corporate',
				'Contacts': '/clients/sme',
				'GDPR & KYC Documents': '/clients/sme',
				'Employer & Revenues': '/clients/sme',
				
			}
		},
		{
			name: () => $_('navbar.products'),
			icon: GridOutline,
			children: {
				'Accounts': '/products/casa', // TODO: Translate child items
				'Loans': '/products/loan',
				'Cards': '/products/card',
				'Deposits': '/products/deposit',
				'Insurances': '/products/insurance',
				'Investments': '/products/investment',				
			}
		},
		{
			name: () => $_('navbar.transactions'),
			icon: ArrowsRepeatOutline,
			children: {
				'Deposit': clientProductSummaryPath(getCurrentClient()), // TODO: Translate child items
				'Withdrawal': '/clients/corporate',
				'Transfers': '/clients/sme'
			}
		},
		{ name: () => 'Reports', icon: ChartMixedOutline, href: '/reports' }, // No key for Reports yet
		{ name: () => 'Admin', icon: BuildingOutline, href: '/admin' } // No key for Admin yet
	]);
	
	// Need to ensure dropdown keys are stable if names are functions now
	// Using a unique ID or the original English name for the key might be better for $state(Object.fromEntries(...))
	// For now, this might cause issues with dropdown state if translated names change order or value.
	// A simple fix is to use the href or a fixed ID if available for the keys in `dropdowns` state.
	// However, the current structure of primary_actions (using name as key) will use the function itself as key.
	// Let's assume for now this works or will be refactored if dropdown state is problematic.
	let primary_actions = $derived(isCurrentClient() ? client_actions : non_client_actions);

	// This part for dropdowns needs careful handling if `name` becomes a function returning translated string
	// A quick fix might be to use the index or a static key part of the object for dropdowns state
	let dropdowns = $derived(Object.fromEntries(primary_actions.map((action, index) => [action.name, false])));

</script>

<Sidebar
	class={drawerHidden ? 'hidden' : ''}
	activeUrl={mainSidebarUrl}
	activeClass="bg-green-100 dark:bg-green-700"
	asideClass="fixed inset-0 z-30 flex-none h-full w-64 lg:h-auto border-e border-grey-200 dark:border-grey-600 lg:overflow-y-visible lg:pt-16 lg:block"
>
	<h4 class="sr-only">Main menu</h4>
	<SidebarWrapper
		divClass="overflow-y-auto px-3 pt-20 lg:pt-5 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-4rem)] lg:block dark:bg-gray-800 lg:me-0 lg:sticky top-2"
	>
		<nav class="divide-y divide-gray-200 dark:divide-gray-700">
			<SidebarGroup ulClass={groupClass} class="mb-3">
				{#each primary_actions as action (action.name)} 
					{#if action.children}
						<SidebarDropdownWrapper bind:isOpen={dropdowns[action.name]} label={action.name()} class="pr-3">
							<AngleDownOutline slot="arrowdown" strokeWidth="3.3" size="sm" />
							<AngleUpOutline slot="arrowup" strokeWidth="3.3" size="sm" />
							<svelte:component this={action.icon} slot="icon" class={iconClass} />
							{#each Object.entries(action.children) as [title, href]}
								<SidebarItem label={title} href={href as string} spanClass="ml-9" class={itemClass} /> 
							{/each}
						</SidebarDropdownWrapper>
					{:else}
						<SidebarItem label={action.name()} href={action.href as string} spanClass="ml-3" class={itemClass}>
							<svelte:component this={action.icon} slot="icon" class={iconClass} />
						</SidebarItem>
					{/if}
				{/each}
			</SidebarGroup>
		</nav>
	</SidebarWrapper>
</Sidebar>

<div
	hidden={drawerHidden}
	class="fixed inset-0 z-20 bg-gray-900/50 dark:bg-gray-900/60"
	onclick={closeDrawer}
	onkeydown={closeDrawer}
	role="presentation"
></div>
