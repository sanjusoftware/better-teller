<script lang="ts">
	import {
		ArrowKeyUp,
		Button,
		ButtonGroup,
		Checkbox,
		Dropdown,
		Search,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Tooltip
	} from 'flowbite-svelte';
	import {
		ArrowUpOutline,
		BanOutline,
		BookOpenOutline,
		BookOutline,
		CashOutline,
		ChartMixedDollarOutline,
		CheckCircleOutline,
		ChevronLeftOutline,
		ChevronRightOutline,
		CirclePauseOutline,
		CirclePlusOutline,
		CreditCardPlusAltOutline,
		DownloadOutline,
		EyeSolid,
		FileCopyOutline,
		FilterSolid,
		HomeOutline,
		LockOpenOutline,
		TruckClockOutline
	} from 'flowbite-svelte-icons';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import { TableHeader } from 'flowbite-svelte-blocks';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let loans = data.Loans;
	let client = data.client;

	import { onMount } from 'svelte';
	import CreditCard from '$lib/utils/CreditCard.svelte';
	import dayjs from 'dayjs';
	import { copy } from 'svelte-copy';

	let searchTerm = $state('');
	let currentPosition = $state(0);
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = $state(0);
	let pagesToShow: number[] = $state([]);
	let totalItems = $derived(loans.length);
	let startPage: number;
	let endPage = $state(0);

	const updateDataAndPagination = () => {
		loans.slice(currentPosition, currentPosition + itemsPerPage);
		renderPagination();
	};

	const loadNextPage = () => {
		if (currentPosition + itemsPerPage < loans.length) {
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

	const currentPageItems = $derived(loans.slice(currentPosition, currentPosition + itemsPerPage));
	const filteredItems = $derived(
		loans.filter(
			(loan) =>
				loan.accountNumber.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				loan.iban.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		)
	);

	const toggleAll = (event: Event) => {
		const isChecked = (event.target as HTMLInputElement).checked;
		document.querySelectorAll('.chk').forEach((checkbox) => {
			(checkbox as HTMLInputElement).checked = isChecked;
		});
	};

	let divClass = 'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-x-auto';
	let innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	let searchClass = 'w-full md:w-1/2 relative';
	let classInput =
		'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 pl-10';
</script>

<TableSearch
	placeholder="Search by Account Number, IBAN ..."
	hoverable={true}
	bind:inputValue={searchTerm}
	{divClass}
	{innerDivClass}
	{searchClass}
	{classInput}
>
	<div
		slot="header"
		class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
	>
		<Button
			size="sm"
			class="gap-2 whitespace-nowrap px-3"
			href={`/clients/${client.type}/${client.cif}/loans/new`}
		>
			<ChartMixedDollarOutline size="sm" />New Loan
		</Button>
		<Button color="alternative">Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
		<Dropdown class="w-48 p-3 space-y-2 text-sm">
			<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Show only:</h6>
			{#each ['Active', 'NPA', 'Closed'] as loanStatus}
				<li>
					<Checkbox>{loanStatus} (5)</Checkbox>
				</li>
			{/each}
		</Dropdown>
	</div>
	<TableHead>
		<TableHeadCell class="!p-4"><Checkbox id="checkAll" on:change={toggleAll} /></TableHeadCell>
		{#each ['Account Number', 'Cif', 'Type', 'Amount', 'Opened on', 'EMI', 'Status', 'Actions'] as header}
			<TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody class="divide-y">
		{#each searchTerm != '' ? filteredItems : currentPageItems as loan}
			<TableBodyRow class="text-base">
				<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
				<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<div class="text-base font-semibold text-gray-900 dark:text-white">
							<a href="/transactions" class="hover:underline">
								{loan.accountNumber}
							</a>
							<button use:copy={loan.accountNumber}>
								<FileCopyOutline size="sm" class="mr-2" />
							</button>
							<Tooltip placement="right" trigger="click" class="text-sm font-light">
								Copied account number: {loan.accountNumber}
							</Tooltip>
						</div>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							IBAN: {loan.iban}
							<button use:copy={loan.iban}>
								<FileCopyOutline size="sm" class="mr-2" />
							</button>
							<Tooltip placement="right" trigger="click" class="text-sm font-light">
								Copied IBAN: {loan.iban}
							</Tooltip>
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal p-4">
					{loan.customerId}
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					
						{#if loan.type === 'Home'}
							<HomeOutline size="sm" class="mr-1"/>
						{:else if loan.type === 'WCL'}
							<CashOutline size="sm" class="mr-1" />
						{:else if loan.type === 'Auto'}
							<TruckClockOutline size="sm" class="mr-1" />
						{/if}
						{loan.type}					
				</TableBodyCell>

				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					<div class="text-base font-semibold text-gray-900 dark:text-white">
						{loan.principle_amount.toLocaleString()}
					</div>
					<div class="text-sm font-small text-gray-500 dark:text-gray-400">
						@{loan.roi}%
					</div>
				</TableBodyCell>
				<TableBodyCell
					class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
				>
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						{new Date(loan.created_on).toLocaleDateString()}
					</div>
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					{loan.emi.toLocaleString()}
				</TableBodyCell>
				<TableBodyCell class="p-4 font-normal">
					<StatusIndicator status={loan.status} />
				</TableBodyCell>
				<TableBodyCell class="space-x-2 p-4">
					<ButtonGroup>
						<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
							<EyeSolid size="sm" /> Statement
						</Button>
						<Button outline color="light" size="xs" class="gap-2 px-3" href="/transactions">
							<DownloadOutline size="sm" /> Download
						</Button>
					</ButtonGroup>
					{#if loan.status === 'Active'}
						<Button outline size="xs" class="gap-2 px-3">
							<CirclePlusOutline size="sm" /> TopUp
						</Button>
					{:else if loan.status === 'Closed'}
						<Button outline size="xs" class="gap-2 px-3">
							<BookOpenOutline size="sm" /> Reopen
						</Button>
					{/if}
					{#if loan.status !== 'Closed'}
						<Button outline color="red" size="xs" class="gap-2 px-3">
							<LockOpenOutline size="sm" /> Close
						</Button>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
	<div
		slot="footer"
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
</TableSearch>

{#if loans.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No loans</h1>
	</div>
{/if}
