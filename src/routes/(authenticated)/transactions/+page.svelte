<script lang="ts">	
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
	let transactions = $derived(data.transactions);

	import {
		Breadcrumb,
		BreadcrumbItem
	} from 'flowbite-svelte';

	import Transactions from '$lib/utils/Transactions.svelte';
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem>Transactions</BreadcrumbItem>
	{#if data.cif}
		<BreadcrumbItem href="/transactions?cif={data.cif}">CIF: {data.cif}</BreadcrumbItem>
	{/if}
	{#if data.acountNumber !== null}
		<BreadcrumbItem href="/transactions?accountnumber={data.acountNumber}">
			Account: {data.acountNumber}
		</BreadcrumbItem>
	{/if}
</Breadcrumb>

<Transactions {transactions}/>


