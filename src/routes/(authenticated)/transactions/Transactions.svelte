<script lang="ts">
	import {
		Checkbox,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	import CreditCard from '$lib/utils/CreditCard.svelte';
	import StatusBadge from '$lib/utils/StatusBadge.svelte';

	const headers = [
		'Transaction ID',
		'Type',
		'Details',
		'Description',
		'Date & Time',
		'Amount',
		'Payment method',
		'Status'
	];

	export let transactions: {
		id: string;
		type: string;
		detail: string;
		description: string;
		date: string;
		amount: string;
		method: string;
		status: string;
	}[];

	const toggleAll = (event: Event) => {
		console.log('toggle called');
		const isChecked = (event.target as HTMLInputElement).checked;
		document.querySelectorAll('.chk').forEach((checkbox) => {
			(checkbox as HTMLInputElement).checked = isChecked;
		});
	};
</script>

<TableHead>
	<TableHeadCell class="!p-4"><Checkbox id="checkAll" on:change={toggleAll} /></TableHeadCell>
	{#each headers as header}
		<TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
	{/each}
</TableHead>
<TableBody class="divide-y">
	{#each transactions as transaction}
		<TableBodyRow>
			<TableBodyCell class="!p-4">
				<Checkbox class="chk" />
			</TableBodyCell>
			<TableBodyCell class="px-4 font-normal">{transaction.id}</TableBodyCell>
			<TableBodyCell class="px-4 font-normal">{transaction.type}</TableBodyCell>
			<TableBodyCell class="px-4 font-normal">{transaction.detail}</TableBodyCell>
			<TableBodyCell class="px-4 font-normal">{transaction.description}</TableBodyCell>
			<TableBodyCell class="px-4 font-normal text-gray-500 dark:text-gray-400">
				{transaction.date}
			</TableBodyCell>
			<TableBodyCell class="px-4">{transaction.amount}</TableBodyCell>
			<TableBodyCell
				class="flex items-center gap-2 px-4 font-normal  text-gray-500 dark:text-gray-400"
			>
				<CreditCard cardType={transaction.method} />
				<span>
					••• {transaction.id.slice(transaction.id.length - 4, transaction.id.length)}
				</span>
			</TableBodyCell>
			<TableBodyCell class="px-4 font-normal">
				<StatusBadge status={transaction.status} />
			</TableBodyCell>
		</TableBodyRow>
	{/each}
</TableBody>
