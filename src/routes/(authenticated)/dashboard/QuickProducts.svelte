<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import {
		ChartMixedDollarOutline,
		CreditCardOutline,
		EyeOutline,
		GridOutline,
		QrCodeOutline
	} from 'flowbite-svelte-icons';

	let items = [
		{
			name: 'Plans',
			icon: GridOutline,
			description: 'Current, Savings, Packages',
			href: '/products/casa'
		},
		{
			name: 'Cards',
			icon: CreditCardOutline,
			description: 'Traellers, Platinum, Student, Dinners',
			href: '/products/card'
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

<Card size="none" class="mb-5">
	<div class="mb-4 flex items-center justify-between">
		<div class="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-white">
			<GridOutline />
			<span>Browse Products</span>
		</div>
		<a
			href="/products/all"
			class="inline-flex items-center rounded-lg p-2 text-sm font-normal text-primary-700 dark:text-primary-500"
		>
			<EyeOutline size='sm'/> Show All
		</a>
	</div>
	<div class="grid grid-cols-6 gap-3 xl:grid-cols-6">
		{#each items as action}
			<a href={action.href}>
				<Card class="h-full flex flex-col items-center text-center">
					<span>
						<svelte:component
							this={action.icon}
							class="w-8 h-8 mb-3 text-green-500 dark:text-gray-400 mx-auto"
						/>
						<div class="mb-2 text-xl font-semibold tracking-tight text-green-900 dark:text-white">
							{action.name}
						</div>
						<p class="font-normal text-green-500 dark:text-gray-400">{action.description}</p>
					</span>
				</Card>
			</a>
		{/each}
	</div>
</Card>
