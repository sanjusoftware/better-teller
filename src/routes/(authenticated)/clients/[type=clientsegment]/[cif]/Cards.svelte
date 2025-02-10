<script lang="ts">
	import { copy } from 'svelte-copy';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(customParseFormat);
	dayjs.extend(localizedFormat);

	import {
		Button,
		ButtonGroup,
		Checkbox,
		Dropdown,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Table,
		Tooltip,

		Input

	} from 'flowbite-svelte';
	import {
		BanOutline,
		CheckCircleOutline,
		ChevronLeftOutline,
		ChevronRightOutline,
		CreditCardPlusAltOutline,
		EyeSolid,
		FileCopyOutline,
		FilterSolid,
		LockOpenOutline,

		SearchOutline

	} from 'flowbite-svelte-icons';

	import CreditCard from '$lib/utils/CreditCard.svelte';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';

	function maskCreditCard(cardNumber: string): string {
		return `${cardNumber.slice(0, 4)} XXXX XXXX ${cardNumber.slice(cardNumber.length - 4, cardNumber.length)}`;
	}

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let cards = data.Cards;
	let client = data.client;

	import { onMount } from 'svelte';

	let searchTerm = $state('');
	let currentPosition = $state(0);
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = $state(0);
	let pagesToShow: number[] = $state([]);
	let totalItems = $derived(cards.length);
	let startPage: number;
	let endPage = $state(0);
	let searchPlaceholder = 'Search by Card Number, Account Number, IBAN ...';

	const updateDataAndPagination = () => {
		cards.slice(currentPosition, currentPosition + itemsPerPage);
		renderPagination();
	};

	const loadNextPage = () => {
		if (currentPosition + itemsPerPage < cards.length) {
			currentPosition += itemsPerPage;
			updateDataAndPagination();
		}
	};

	const loadPreviousPage = () => {
		if (currentPosition - itemsPerPage >= 0) {
			currentPosition -= itemsPerPage;
			updateDataAndPagination();
		}
	};

	const renderPagination = () => {
		totalPages = Math.ceil(totalItems / itemsPerPage);
		const currentPage = Math.ceil((currentPosition + 1) / itemsPerPage);
		startPage = currentPage - Math.floor(showPage / 2);
		startPage = Math.max(1, startPage);
		endPage = Math.min(startPage + showPage - 1, totalPages);
		pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	};

	const goToPage = (pageNumber: number) => {
		currentPosition = (pageNumber - 1) * itemsPerPage;
		updateDataAndPagination();
	};

	let startRange = $derived(currentPosition + 1);
	let endRange = $derived(Math.min(currentPosition + itemsPerPage, totalItems));

	onMount(() => {
		renderPagination();
	});

	const currentPageItems = $derived(cards.slice(currentPosition, currentPosition + itemsPerPage));
	const filteredItems = $derived(
		cards.filter(
			(card) =>
				card.accountNumber.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				card.cardNumber.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		)
	);

	const toggleAll = (event: Event) => {
		const isChecked = (event.target as HTMLInputElement).checked;
		document.querySelectorAll('.chk').forEach((checkbox) => {
			(checkbox as HTMLInputElement).checked = isChecked;
		});
	};

</script>

<div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
	<div
		class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
	>
		<label for="table-search" class="sr-only">Search</label>
		<div class="w-full md:w-1/2 relative">
			<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				<SearchOutline size="md" class="text-gray-500 dark:text-gray-400" />
			</div>
			<Input
				bind:value={searchTerm}
				type="search"
				id="table-search"
				class="text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 pl-10"
				placeholder={searchPlaceholder}
			/>
		</div>
		<div
			class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
		>
			<Button
				size="sm"
				class="gap-2 whitespace-nowrap px-3"
				href={`/clients/${client.type}/${client.cif}/cards/new`}
			>
				<CreditCardPlusAltOutline size="sm" />Issue New Card
			</Button>
			<Button color="alternative">Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
			<Dropdown class="w-48 p-3 space-y-2 text-sm">
				<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Show only:</h6>
				{#each ['Active', 'Pending Activation', 'Expiered', 'Blocked'] as cardStatus}
					<li>
						<Checkbox>{cardStatus} (5)</Checkbox>
					</li>
				{/each}
			</Dropdown>
		</div>
	</div>

	<Table>
		<TableHead>
			<TableHeadCell class="!p-4"><Checkbox id="checkAll" on:change={toggleAll} /></TableHeadCell>
			{#each ['Card Number', 'Cif', 'Type', 'Outdtanding Balance', 'Issued On', 'Expiry Date', 'Status', 'Actions'] as header}
				<TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody class="divide-y">
			{#each searchTerm != '' ? filteredItems : currentPageItems as card}
				<TableBodyRow class="text-base">
					<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
					<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								<a href="/transactions" class="hover:underline">
									{maskCreditCard(card.cardNumber)}
								</a>
							</div>
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
					<TableBodyCell class="text-sm font-normal p-4">
						{card.customerId}
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
						<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
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
			{/each}
		</TableBody>
	</Table>
	<div
		class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
		aria-label="Table navigation"
	>
		<span class="text-sm font-normal text-gray-500 dark:text-gray-400">
			Showing
			<span class="font-semibold text-gray-900 dark:text-white">{startRange}-{endRange}</span>
			of
			<span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
		</span>
		<ButtonGroup>
			<Button on:click={loadPreviousPage} disabled={currentPosition === 0}>
				<ChevronLeftOutline size="xs" class="m-1.5" />
			</Button>
			{#each pagesToShow as pageNumber}
				<Button on:click={() => goToPage(pageNumber)}>{pageNumber}</Button>
			{/each}
			<Button on:click={loadNextPage} disabled={totalPages === endPage}>
				<ChevronRightOutline size="xs" class="m-1.5" />
			</Button>
		</ButtonGroup>
	</div>
</div>

{#if cards.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No cards issued.</h1>
	</div>
{/if}
