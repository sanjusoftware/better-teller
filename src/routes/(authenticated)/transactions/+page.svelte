<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Dropdown,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		ButtonGroup
	} from 'flowbite-svelte';

	import {
		FilterSolid,
		ChevronLeftOutline,
		ChevronRightOutline
	} from 'flowbite-svelte-icons';

	import { Section } from 'flowbite-svelte-blocks';
	import CreditCard from '$lib/utils/CreditCard.svelte';
	import StatusBadge from '$lib/utils/StatusBadge.svelte';
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
		(item) => item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        item.detail.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        item.id.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
    
	let divClass = 'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
	let innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	let searchClass = 'w-full md:w-1/2 relative';
	let classInput =
		'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10';

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

<Section name="advancedTable" classSection="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
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
		<TableHead>
			<TableHeadCell class="!p-4"><Checkbox id="checkAll" on:change={toggleAll}/></TableHeadCell>            
			{#each headers as header}
				<TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody class="divide-y">
			{#if searchTerm !== ''}
				{#each filteredItems as item}
					<TableBodyRow>
						<TableBodyCell class="!p-4">
							<Checkbox class="chk"/>
						</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">{item.id}</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">{item.type}</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">{item.detail}</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">{item.description}</TableBodyCell>
						<TableBodyCell class="px-4 font-normal text-gray-500 dark:text-gray-400">
							{item.date}
						</TableBodyCell>
						<TableBodyCell class="px-4">{item.amount}</TableBodyCell>
						<TableBodyCell
							class="flex items-center gap-2 px-4 font-normal  text-gray-500 dark:text-gray-400"
						>
							<CreditCard cardType={item.method} />
							<span>
								••• {item.id.slice(item.id.length - 4, item.id.length)}
							</span>
						</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">
							<StatusBadge status={item.status} />
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{:else}
				{#each currentPageItems as item}
					<TableBodyRow>
						<TableBodyCell class="!p-4">
							<Checkbox class="chk"/>
						</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">{item.id}</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">{item.type}</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">{item.detail}</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">{item.description}</TableBodyCell>
						<TableBodyCell class="px-4 font-normal text-gray-500 dark:text-gray-400">
							{item.date}
						</TableBodyCell>
						<TableBodyCell class="px-4">{item.amount}</TableBodyCell>
						<TableBodyCell
							class="flex items-center gap-2 px-4 font-normal  text-gray-500 dark:text-gray-400"
						>
							<CreditCard cardType={item.method} />
							<span>
								••• {item.id.slice(item.id.length - 4, item.id.length)}
							</span>
						</TableBodyCell>
						<TableBodyCell class="px-4 font-normal">
							<StatusBadge status={item.status} />
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/if}
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
</Section>
