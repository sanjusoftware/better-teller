<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import {
		ArrowsRepeatOutline,
		ArrowUpDownOutline,
		CashOutline,
		EditOutline,
		ExpandOutline
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
			description: 'Incoming, Outgoing',
			href: '/transactions'
		}
	];
</script>

<Card size="none">
	<div class="mb-4 flex items-center justify-between">
		<div class="flex items-center gap-2 font-medium text-grey-600">
			<ExpandOutline />
			<span>Quick Actions</span>
		</div>
		<a
			href="#top"
			class="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
		>
			<EditOutline size="sm" />
		</a>
	</div>
	<div class="grid grid-cols-2 gap-3 xl:grid-cols-3">
		{#each quickactions as action}
			<a href={action.href}>
				<Card class="h-full">
					<span>
						<svelte:component
							this={action.icon}
							class="w-8 h-8 mb-3 text-green-500 dark:text-gray-400"
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
