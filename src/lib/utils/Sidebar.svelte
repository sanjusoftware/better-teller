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

	let non_client_actions = [
		{ name: 'Home', icon: HomeOutline, href: '/dashboard' },		
		{ name: 'Reports', icon: ChartMixedOutline, href: '/reports' },
		{ name: 'Admin', icon: BuildingOutline, href: '/admin' }
	];

	let client_actions = [
		{ name: 'Home', icon: HomeOutline, href: '/dashboard' },
		{
			name: "Client's Info",
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
			name: 'Products',
			icon: GridOutline,
			children: {
				'Accounts': '/products/casa',
				'Loans': '/products/loan',
				'Cards': '/products/card',
				'Deposits': '/products/deposit',
				'Insurances': '/products/insurance',
				'Investments': '/products/investment',				
			}
		},
		{
			name: "Transactions",
			icon: ArrowsRepeatOutline,
			children: {
				'Deposit': clientProductSummaryPath(getCurrentClient()),
				'Withdrawal': '/clients/corporate',
				'Transfers': '/clients/sme'
			}
		},
		{ name: 'Reports', icon: ChartMixedOutline, href: '/reports' },
		{ name: 'Admin', icon: BuildingOutline, href: '/admin' }
	];

	let primary_actions = $derived(isCurrentClient() ? client_actions : non_client_actions)
	

	let dropdowns = $state(Object.fromEntries(Object.keys(() => primary_actions).map((x) => [x, false])));
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
				{#each primary_actions as { name, icon, children, href } (name)}
					{#if children}
						<SidebarDropdownWrapper bind:isOpen={dropdowns[name]} label={name} class="pr-3">
							<AngleDownOutline slot="arrowdown" strokeWidth="3.3" size="sm" />
							<AngleUpOutline slot="arrowup" strokeWidth="3.3" size="sm" />
							<svelte:component this={icon} slot="icon" class={iconClass} />
							{#each Object.entries(children) as [title, href]}
								<SidebarItem label={title} href={href as string} spanClass="ml-9" class={itemClass} />
							{/each}
						</SidebarDropdownWrapper>
					{:else}
						<SidebarItem label={name} {href} spanClass="ml-3" class={itemClass}>
							<svelte:component this={icon} slot="icon" class={iconClass} />
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
