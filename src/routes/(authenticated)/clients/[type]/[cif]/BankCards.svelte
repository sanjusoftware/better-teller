<script lang="ts">
	import {
		Button,
		Checkbox,
		Card,
		Indicator,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { BanOutline, EyeSolid, LockTimeOutline, PlusOutline } from 'flowbite-svelte-icons';
	import CreditCard from "../../../../utils/CreditCard.svelte";

	export let bankcards: Array<{
        "cardType": string,
        "cardNumber": string,
        "issueDate": string,
        "expiryDate": string,
        "accountNumber": string,
        "customerId": number
    }> = [];

</script>

<Card size="xl">
	<div class="flex justify-between items-center mb-4">
		<h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Bank Cards</h1>
		<Button
			on:click={() => {
				/* logic to issue new card */
			}}
			class="w-fit"> 
			<PlusOutline size="md" class="mr-2" />
				Issue New Card
		</Button>
	</div>
	<Table>
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			<TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell>
			{#each ['Card Number', 'Type', 'Issue Date', 'Expiry Date', 'Status', 'Actions'] as title}
				<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each bankcards as bankcard}
				<TableBodyRow class="text-base">
					<TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell>
					<TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								<a href="/transactions" class="hover:underline">
									<span>{bankcard.cardNumber.slice(0, 4)} XXXX XXXX {bankcard.cardNumber.slice(bankcard.cardNumber.length - 4, bankcard.cardNumber.length)}</span>
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
						<div class="flex items-center gap-2">
							<Indicator color={new Date(bankcard.expiryDate) > new Date() ? 'green' : 'red'} />
							{new Date(bankcard.expiryDate) > new Date() ? 'Active' : 'Expiered'}
						</div>
					</TableBodyCell>
					<TableBodyCell class="space-x-2 p-4">
						<Button outline size="xs" class="gap-2 px-3" href="/transactions">
							<EyeSolid size="sm" /> Transactions
						</Button>
						<Button outline color="yellow" size="xs" class="gap-2 px-3">
							<LockTimeOutline size="sm" /> Suspend
						</Button>
						<Button outline color="red" size="xs" class="gap-2 px-3">
							<BanOutline size="sm" /> Block
						</Button>
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
</Card>
