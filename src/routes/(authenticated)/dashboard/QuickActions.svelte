<script lang="ts">
	import { currentClient } from '$lib/servicecontext.svelte';
	import { currentClientProductsPath } from '$lib/utils/pathHelper';
	import { Card } from 'flowbite-svelte';
	import {
		ArrowsRepeatOutline,
		ArrowUpDownOutline,
		CashOutline,
		CreditCardOutline,
		EditOutline,
		QrCodeOutline
	} from 'flowbite-svelte-icons';

	let quickLinks = [
		
		{
			name: 'Cards',
			icon: CreditCardOutline,
			description: 'Debit, Credit, Prepaid',
			href: currentClientProductsPath(currentClient.current, 'cards') 
		},
		{
			name: 'Accounts',
			icon: QrCodeOutline,
			description: 'Savings, Current, Fixed',
			href: currentClientProductsPath(currentClient.current, 'accounts')
		},		
		{
			name: 'Transactions',
			icon: ArrowsRepeatOutline,
			description: 'Internal, External, International',
			href: currentClientProductsPath(currentClient.current, 'transactions')
		},
		{
			name: 'Transfers',
			icon: ArrowUpDownOutline,	
			description: 'Internal, External, International',
			href: currentClientProductsPath(currentClient.current, 'transfers')
		},
		{
			name: 'Payments',
			icon: CashOutline,
			description: 'Phone, Water, Electricity',
			href: currentClientProductsPath(currentClient.current, 'payments')
		}
	];
</script>

<Card size="none" class="mb-5">
	<div class="mb-4 flex items-center justify-between">
		<div class="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
			Quick Links
		</div>
		<a
			href="#top"
			class="inline-flex items-center rounded-lg p-2 text-sm font-normal text-primary-700 dark:text-primary-500"
		>
			<EditOutline size="sm" /> Edit Links
		</a>
	</div>
	<div class="grid grid-cols-5 gap-3 xl:grid-cols-5">
		{#each quickLinks as action}
			<a href={action.href}>
				<Card size="md" class="h-full flex flex-col items-center text-center">
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
