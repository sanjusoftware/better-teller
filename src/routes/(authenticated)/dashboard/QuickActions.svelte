<script lang="ts">
	import { Card, Heading } from 'flowbite-svelte';
	import {
		ArrowsRepeatOutline,
		ArrowUpDownOutline,
		CashOutline
	} from 'flowbite-svelte-icons';

	let quickactions = [
		{
			name: 'Transfers',
			icon: ArrowUpDownOutline,
			description: 'SEPA, BLINK, SWIFT, P2P',
			href: '/transfers'
		},
		{
			name: 'Payments',
			icon: CashOutline,
			description: 'Phone, Water, Electricity',
			href: '/payments'
		},		
		{
			name: 'Transactions',
			icon: ArrowsRepeatOutline,
			description: 'Accounts, Cards, Incoming, Outgoing',
			href: '/transactions'
		}
	];
</script>

<Heading class="mb-4 text-2xl font-semibold tracking-tight text-grey-500 dark:text-white">
	Quick Actions
</Heading>
<div class="grid grid-cols-2 gap-3 xl:grid-cols-3 mb-5">
	{#each quickactions as action}
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
