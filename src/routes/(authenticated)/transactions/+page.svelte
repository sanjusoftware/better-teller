<script lang="ts">
	import Transactions from './Transactions.svelte';

	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Dropdown,
		TableBody,
		TableHead,
		TableHeadCell,
		TableSearch,
		ButtonGroup
	} from 'flowbite-svelte';

	import { FilterSolid, ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

	import { Section } from 'flowbite-svelte-blocks';
	import { onMount } from 'svelte';
	import transactions from '$lib/data/transactions.json';

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

	let searchTerm = '';
	let currentPosition = 0;
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = 0;
	let pagesToShow: number[] = [];
	let totalItems = transactions.length;
	let startPage: number;
	let endPage: number;

	const updateDataAndPagination = () => {
		transactions.slice(currentPosition, currentPosition + itemsPerPage);
		renderPagination();
	};

	const loadNextPage = () => {
		if (currentPosition + itemsPerPage < transactions.length) {
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

	$: startRange = currentPosition + 1;
	$: endRange = Math.min(currentPosition + itemsPerPage, totalItems);

	onMount(() => {
		// Call renderPagination when the component initially mounts
		renderPagination();
	});

	$: currentPageItems = transactions.slice(currentPosition, currentPosition + itemsPerPage);
	$: filteredItems = transactions.filter(
		(item) =>
			item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
			item.detail.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
			item.id.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	let divClass = 'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-x-auto';
	let innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	let searchClass = 'w-full md:w-1/2 relative';
	let classInput =
		'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 pl-10';
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem href="/transactions">Transactions</BreadcrumbItem>
</Breadcrumb>

<TableSearch
	placeholder="Search by TransactionID or Description..."
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
		<Button color="alternative">Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
		<Dropdown class="w-48 p-3 space-y-2 text-sm">
			<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Show only:</h6>
			<li>
				<Checkbox>Incoming (56)</Checkbox>
			</li>
			<li>
				<Checkbox>Outgoing (16)</Checkbox>
			</li>
			<li>
				<Checkbox>Utility Payment (49)</Checkbox>
			</li>
			<li>
				<Checkbox>Reversal (12)</Checkbox>
			</li>
			<li>
				<Checkbox>Domestic (74)</Checkbox>
			</li>
			<li>
				<Checkbox>Intrabank (74)</Checkbox>
			</li>
			<li>
				<Checkbox>International (74)</Checkbox>
			</li>
		</Dropdown>
	</div>

	<Transactions transactions={searchTerm !== '' ? filteredItems : currentPageItems} />

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
