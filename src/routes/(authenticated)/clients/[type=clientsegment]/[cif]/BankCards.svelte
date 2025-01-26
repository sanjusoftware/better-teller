<script lang="ts">
	import {
		Button,
		Search,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import {
		BanOutline,
		CheckCircleOutline,
		CreditCardPlusAltOutline,
		EyeSolid,
		LockOpenOutline
	} from 'flowbite-svelte-icons';

	import CreditCard from '../../../../utils/CreditCard.svelte';
	import StatusIndicator from '../../../../utils/StatusIndicator.svelte';
	import { TableHeader } from 'flowbite-svelte-blocks';

	function maskCreditCard(cardNumber: string): string {
		return `${cardNumber.slice(0, 4)} XXXX XXXX ${cardNumber.slice(cardNumber.length - 4, cardNumber.length)}`;
	}

	export let bankcards: Array<{
		cardType: string;
		cardNumber: string;
		issueDate: string;
		expiryDate: string;
		accountNumber: string;
		customerId: number;
		status: string;
	}> = [];
</script>

<TableHeader headerType="search">
	<Search slot="search" size="md" placeholder="Search by Card Number, Account Number ..." />
	<Button
		on:click={() => {
			/* logic to issue new card */
		}}
		class="w-fit"
	>
		<CreditCardPlusAltOutline size="md" class="mr-2" />
		Issue New Card
	</Button>
</TableHeader>
<Table>
	<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
		{#each ['Card Number', 'Type', 'Issue Date', 'Expiry Date', 'Status', 'Actions'] as title}
			<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each bankcards as bankcard}
			<TableBodyRow class="text-base">
				<TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<div class="text-base font-semibold text-gray-900 dark:text-white">
							<a href="/transactions" class="hover:underline">
								<span>
									{maskCreditCard(bankcard.cardNumber)}
								</span>
							</a>
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell
					class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
				>
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<CreditCard cardType={bankcard.cardType} />
					</div>
				</TableBodyCell>
				<TableBodyCell
					class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
				>
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						{new Date(bankcard.issueDate).toLocaleDateString()}
					</div>
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					{new Date(bankcard.expiryDate).toLocaleDateString()}
				</TableBodyCell>
				<TableBodyCell class="p-4 font-normal">
					<StatusIndicator status={bankcard.status} />
				</TableBodyCell>
				<TableBodyCell class="space-x-2 p-4">
					<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
						<EyeSolid size="sm" /> Transactions
					</Button>
					{#if bankcard.status === 'Active'}
						<Button outline color="red" size="xs" class="gap-2 px-3">
							<BanOutline size="sm" /> Block
						</Button>
					{:else if bankcard.status === 'Pending Activation'}
						<Button outline color="green" size="xs" class="gap-2 px-3">
							<CheckCircleOutline size="sm" /> Activate
						</Button>
					{:else if bankcard.status === 'Blocked'}
						<Button outline color="green" size="xs" class="gap-2 px-3">
							<LockOpenOutline size="sm" /> Unblock
						</Button>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
{#if bankcards.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No cards issued.</h1>
	</div>
{/if}
