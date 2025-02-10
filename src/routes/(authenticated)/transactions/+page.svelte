<script lang="ts">
	import transactions from '$lib/data/transactions.json';
	import CreditCard from '$lib/utils/CreditCard.svelte';
	import StatusBadge from '$lib/utils/StatusBadge.svelte';
	import { onMount } from 'svelte';

	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		ButtonGroup,
		Checkbox,
		Dropdown,
		Input,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	import { ChevronLeftOutline, ChevronRightOutline, FilterSolid, SearchOutline } from 'flowbite-svelte-icons';

	let searchTerm = $state('');
	let currentPosition = $state(0);
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = $state(0);
	let pagesToShow: number[] = $state([]);
	let totalItems = $derived(transactions.length);
	let startPage: number;
	let endPage = $state(0);
	let searchPlaceholder = 'Search by File Name, Document Type, Document Id ...';

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

	let startRange = $derived(currentPosition + 1);
	let endRange = $derived(Math.min(currentPosition + itemsPerPage, totalItems));

	onMount(() => {
		renderPagination();
	});

	const currentPageItems = $derived(
		transactions.slice(currentPosition, currentPosition + itemsPerPage)
	);
	const filteredItems = $derived(
		transactions.filter(
			(item) =>
				item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				item.detail.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				item.id.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		)
	);

	const toggleAll = (event: Event) => {
		console.log('toggle called');
		const isChecked = (event.target as HTMLInputElement).checked;
		document.querySelectorAll('.chk').forEach((checkbox) => {
			(checkbox as HTMLInputElement).checked = isChecked;
		});
	};
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href="/dashboard">Home</BreadcrumbItem>
	<BreadcrumbItem href="/transactions">Transactions</BreadcrumbItem>
</Breadcrumb>

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
	</div>
	<Table>
		<TableHead>
			<TableHeadCell class="!p-4"><Checkbox id="checkAll" on:change={toggleAll} /></TableHeadCell>
			{#each ['Transaction ID', 'Type', 'Details', 'Description', 'Date & Time', 'Amount', 'Payment method', 'Status'] as header}
				<TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody class="divide-y">
			{#each searchTerm != '' ? filteredItems : currentPageItems as transaction}
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
