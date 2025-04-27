<script lang="ts">
	import CreditCard from '$lib/utils/CreditCard.svelte';
	import Pagination from '$lib/utils/Pagination.svelte';
	import StatusBadge from '$lib/utils/StatusBadge.svelte';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);
	import { copy } from 'svelte-copy';
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
	let transactions = $derived(data.transactions);

	import {
		Breadcrumb,
		BreadcrumbItem,
		Checkbox,
		TableBodyCell,
		TableBodyRow,
		Tooltip
	} from 'flowbite-svelte';

	import { FileCopyOutline } from 'flowbite-svelte-icons';
	import Transactions from './Transactions.svelte';
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


