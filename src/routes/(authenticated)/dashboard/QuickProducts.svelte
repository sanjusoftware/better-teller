<script lang="ts">
	import { Card, Heading } from 'flowbite-svelte';
	import {
		ChartMixedDollarOutline,
		CreditCardOutline,

		QrCodeOutline

	} from 'flowbite-svelte-icons';

	let items = [				
		{
			name: 'Accounts',
			icon: QrCodeOutline,
			description: 'Current, Savings, Packages',
			href: '/products/casa'
		},
		{
			name: 'Cards',
			icon: CreditCardOutline,
			description: 'Traellers, Platinum, Student, Dinners',
			href: '/products/cards'
		},		
		{
			name: 'Loans',
			icon: ChartMixedDollarOutline,
			description: 'Cash, WCL, Home, Auto',
			href: '/products/loan'
		},		
		{
			name: 'Deposits',
			icon: ChartMixedDollarOutline,
			description: 'Term Deposit, Recurring',
			href: '/products/deposit'
		},		
		{
			name: 'Investments',
			icon: ChartMixedDollarOutline,
			description: 'Mutual Funds, Gold Bonds, Govt. Bonds',
			href: '/products/investment'
		},		
		{
			name: 'Insurance',
			icon: ChartMixedDollarOutline,
			description: 'Life, Real Estate, Lending',
			href: '/products/insurance'
		}
	];
</script>

<Heading class="mb-4 text-2xl font-semibold tracking-tight text-grey-500 dark:text-white">
	Products
</Heading>
<div class="grid grid-cols-2 gap-3 xl:grid-cols-3">
	{#each items as action}
	<a href={action.href}>
		<Card>
			<span>
				<svelte:component this={action.icon} class="w-8 h-8 mb-3 text-green-500 dark:text-gray-400" />
				<div class="mb-2 text-xl font-semibold tracking-tight text-green-900 dark:text-white">
					{action.name}
				</div>
				<p class="font-normal text-green-500 dark:text-gray-400">{action.description}</p>
			</span>
		</Card>
	</a>
	{/each}	
</div>
