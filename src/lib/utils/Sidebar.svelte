<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

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
		ChartMixedDollarOutline,
		ChartPieOutline,
		CogOutline,
		CreditCardOutline,
		EuroOutline,
		HomeOutline,
		HourglassOutline,
		LifeSaverSolid,
		QrCodeOutline,
		UsersGroupOutline
	} from 'flowbite-svelte-icons';

	let { drawerHidden = false } = $props();

	const closeDrawer = () => {
		console.log(drawerHidden);
		drawerHidden = true;
	};

	let iconClass =
		'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white';
	let itemClass =
		'flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700';
	let groupClass = 'pt-2 space-y-2';

	let mainSidebarUrl = $state(page.url.pathname);

	afterNavigate((navigation) => {
		// this fixes https://github.com/themesberg/flowbite-svelte/issues/364
		document.getElementById('svelte')?.scrollTo({ top: 0 });
		closeDrawer();

		mainSidebarUrl = navigation.to?.url.pathname ?? '';
	});

	let primary_actions = [
		{ name: 'Dashboard', icon: ChartPieOutline, href: '/dashboard' },
		{
			name: 'Clients',
			icon: UsersGroupOutline,
			children: {
				Individual: '/clients/retail',
				Corporate: '/clients/corporate',
				SME: '/clients/sme'
			}
		},
		{
			name: 'Accounts',
			icon: QrCodeOutline,
			children: {
				'Current Account': '/products/casa',
				'Savings Account': '/products/casa',
				Packages: '/products/casa'
			}
		},
		{
			name: 'Utility Payments',
			icon: HomeOutline,
			children: {
				Electricity: '/products/loan',
				Water: '/products/loan',
				Phone: '/products/loan'
			}
		},
		{ name: 'Money Transfers', icon: EuroOutline, href: '/dashboard' },
		{
			name: 'Cards',
			icon: CreditCardOutline,
			children: {
				Cards: '/products/card'
			}
		},
		{
			name: 'Loans',
			icon: ChartMixedDollarOutline,
			children: {
				Mortgage: '/products/loan',
				'Working Capital': '/products/loan',
				Cash: '/products/loan'
			}
		},
		{ name: 'Deposits', icon: HourglassOutline, href: '/products/loan' },
		{
			name: 'Investments',
			icon: ChartMixedDollarOutline,
			children: {
				'Mutual Funds': '/products/loan',
				'Gold Bonds': '/products/loan',
				'Govt Bonds': '/products/loan',
				Shares: '/products/loan'
			}
		},
		{
			name: 'Insurance',
			icon: ChartMixedDollarOutline,
			children: {
				'Life Insurance': '/products/loan',
				'Property Insurance': '/products/loan',
				'Lending Insurance': '/products/loan'
			}
		}
	];

	let secondary_actions = [
		{ label: 'Settings', icon: CogOutline, href: '/settings' },
		{
			label: 'Support',
			href: 'https://betterteller.dskbank.bg/help',
			icon: LifeSaverSolid
		}
	];

	let dropdowns = $state(Object.fromEntries(Object.keys(primary_actions).map((x) => [x, false])));
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
								<SidebarItem label={title} {href} spanClass="ml-9" class={itemClass} />
							{/each}
						</SidebarDropdownWrapper>
					{:else}
						<SidebarItem label={name} {href} spanClass="ml-3" class={itemClass}>
							<svelte:component this={icon} slot="icon" class={iconClass} />
						</SidebarItem>
					{/if}
				{/each}
			</SidebarGroup>
			<SidebarGroup ulClass={groupClass}>
				{#each secondary_actions as { label, href, icon } (label)}
					<SidebarItem {label} {href} spanClass="ml-3" class={itemClass}>
						<svelte:component this={icon} slot="icon" class={iconClass} />
					</SidebarItem>
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
