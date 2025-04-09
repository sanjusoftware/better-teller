<script lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import { copy } from 'svelte-copy';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);

	import CreditCard from '$lib/utils/CreditCard.svelte';
	import Pagination from '$lib/utils/Pagination.svelte';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';

	import {
		Button,
		Checkbox,
		TableBodyCell,
		TableBodyRow,
		Tooltip
	} from 'flowbite-svelte';
	import {
		BanOutline,
		CheckCircleOutline,
		CreditCardPlusAltOutline,
		EyeSolid,
		FileCopyOutline,
		LockOpenOutline
	} from 'flowbite-svelte-icons';

	function maskCreditCard(cardNumber: string): string {
		return `${cardNumber.slice(0, 4)} XXXX XXXX ${cardNumber.slice(cardNumber.length - 4, cardNumber.length)}`;
	}

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let cards = data.Cards;
	let client = data.client;
	let searchPlaceholder = 'Search by Card Number, Account Number, IBAN ...';
</script>

<Pagination
	items={cards}
	{searchPlaceholder}
	fieldsToSearch={['accountNumber', 'cardNumber']}
	filtersToApply={['cardType','status']}
	tableHeaders={[
		'Card Number',
		'Type',
		'Outdtanding Balance',
		'Issued On',
		'Expiry Date',
		'Status',
		'Actions'
	]}
	{searchHeader}
	{tableRow}
/>

{#snippet searchHeader()}
	<Button
		size="sm"
		class="gap-2 whitespace-nowrap px-3"
		href={`/clients/${client.type}/${client.cif}/cards/new`}
	>
		<CreditCardPlusAltOutline size="sm" />Issue New Card
	</Button>
{/snippet}

{#snippet tableRow(card: any)}
	<TableBodyRow class="text-base">
		<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
		<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
			<div class="text-base font-semibold text-gray-900 dark:text-white">
				<a href="/transactions?accountnumber={card.accountNumber}" class="hover:underline">
					{maskCreditCard(card.cardNumber)}
				</a>
				<Tooltip placement="top" class="text-sm font-light">
					View Transactions
				</Tooltip>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					Account: {card.accountNumber}
					<button use:copy={card.accountNumber}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right" trigger="click" class="text-sm font-light">
						Copied Account Number: {card.accountNumber}
					</Tooltip>
				</div>
			</div>
		</TableBodyCell>
		<TableBodyCell
			class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
		>
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<CreditCard cardType={card.cardType} />
			</div>
		</TableBodyCell>
		<TableBodyCell
			class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
		>
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<div class="text-base font-semibold text-gray-900 dark:text-white">
					{card.outstanding_balance.toLocaleString()}
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">BGN</div>
			</div>
		</TableBodyCell>
		<TableBodyCell
			class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
		>
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				{dayjs(card.issueDate).format('ll')}
			</div>
		</TableBodyCell>
		<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
			{new Date(card.expiryDate).toLocaleDateString()}
		</TableBodyCell>
		<TableBodyCell class="p-4 font-normal">
			<StatusIndicator status={card.status} />
		</TableBodyCell>
		<TableBodyCell class="space-x-2 p-4">
			<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions?accountnumber={card.accountNumber}">
				<EyeSolid size="sm" /> Transactions
			</Button>
			{#if card.status === 'Active'}
				<Button outline color="red" size="xs" class="gap-2 px-3">
					<BanOutline size="sm" /> Block
				</Button>
			{:else if card.status === 'Pending Activation'}
				<Button outline color="green" size="xs" class="gap-2 px-3">
					<CheckCircleOutline size="sm" /> Activate
				</Button>
			{:else if card.status === 'Blocked'}
				<Button outline color="green" size="xs" class="gap-2 px-3">
					<LockOpenOutline size="sm" /> Unblock
				</Button>
			{/if}
		</TableBodyCell>
	</TableBodyRow>
{/snippet}

{#if cards.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No cards issued.</h1>
	</div>
{/if}
