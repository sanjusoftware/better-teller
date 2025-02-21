<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Checkbox,
		Dropdown,
		DropdownDivider,
		Input,
		Table,
		TableBody,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import {
		ChevronLeftOutline,
		ChevronRightOutline,
		FilterSolid,
		SearchOutline
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	let {
		items,
		searchPlaceholder,
		fieldsToSearch,
		filtersToApply = [],
		tableHeaders,
		searchHeader = null,
		tableRow
	} = $props();

	let searchTerm = $state('');
	let appliedFilters: { [key: string]: string[] } = $state({});
	let currentPosition = $state(0);
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = $state(0);
	let pagesToShow: number[] = $state([]);
	let totalItems = $derived(items.length);
	let startPage: number;
	let endPage = $state(0);

	const updateDataAndPagination = () => {
		items.slice(currentPosition, currentPosition + itemsPerPage);
		renderPagination();
	};

	const loadNextPage = () => {
		if (currentPosition + itemsPerPage < items.length) {
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

	const currentPageItems = $derived(items.slice(currentPosition, currentPosition + itemsPerPage));
	const filteredItems = $derived(
		items
			.filter((item: any) =>
				fieldsToSearch.some((field: string) =>
					item[field].toString().toLowerCase().includes(searchTerm.toLowerCase())
				)
			)
			.filter((item: any) => {
				for (const [key, values] of Object.entries(appliedFilters)) {
					if (!values.includes(item[key])) {
						return false;
					}
				}
				return true;
			})
	);

	const toggleAll = (event: Event) => {
		const isChecked = (event.target as HTMLInputElement).checked;
		document.querySelectorAll('.chk').forEach((checkbox) => {
			(checkbox as HTMLInputElement).checked = isChecked;
		});
	};

	const toggleFilter = (event: Event) => {
		let filter = event.target as HTMLInputElement;
		if (filter.checked) {
			if (appliedFilters[filter.id] != null) {
				appliedFilters[filter.id].push(filter.value);
			} else {
				appliedFilters[filter.id] = [filter.value];
			}
		} else {
			appliedFilters[filter.id] = appliedFilters[filter.id].filter(
				(value) => value !== filter.value
			);
			if (appliedFilters[filter.id].length === 0) {
				delete appliedFilters[filter.id];
			}
		}
	};

	const countsByFilters = $derived(
		items.reduce(
			(count: { [filter: string]: [{ [value: string]: number }] }, item: any) => {
				filtersToApply.forEach((filter: string) => {
					if (!count[filter]) {
						// if no counter for filter type, initialize filter with first value and count as 1
						count[filter] = [{ [item[filter]]: 1 }];
						// {type: [{'Incoming': 1}]}
					} else {
						count[filter].forEach((filterValueItem) => {
							if (filterValueItem[item[filter]]) {
								// if found counter for one of the filter values, increment it
								filterValueItem[item[filter]] += 1;
							} else {
								// if not found counter for one of the filter values, add it
								console.log('not found', item[filter]);
								filterValueItem[item[filter]] = 1;
								console.log('added', filterValueItem[item[filter]]);
							}
						});
					}
				});
				return count;
			},
			{}
		)
	);

	onMount(() => {
		renderPagination();
	});
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
			{@render searchHeader?.()}
			{#if filtersToApply.length > 0 && filtersToApply.length < 4}
				{#each Object.keys(countsByFilters) as filter}
					<Button color="alternative">
						{filter.toLocaleUpperCase()}<FilterSolid class="w-3 h-3 ml-2 " />
					</Button>
					<Dropdown class="w-48 p-3 space-y-2 text-sm">
						{#each Object.keys(countsByFilters[filter][0]) as filterValue}
							<li>
								<Checkbox
									id={filter}
									on:change={toggleFilter}
									value={filterValue}
									checked={appliedFilters[filter]?.includes(filterValue)}
								>
									{filterValue} ({countsByFilters[filter][0][filterValue]})
								</Checkbox>
							</li>
						{/each}
					</Dropdown>
				{/each}
			{:else}
				{#each filtersToApply as filter}
					<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
						{filter['name'].toLocaleUpperCase()}:
					</h6>
					{#each filter.values as value}
						<Checkbox id={filter['name']} on:change={toggleFilter} {value}>
							{value}
						</Checkbox>
					{/each}
				{/each}
			{/if}
		</div>
	</div>

	<Table>
		<TableHead>
			<TableHeadCell class="!p-4"><Checkbox id="checkAll" on:change={toggleAll} /></TableHeadCell>
			{#each tableHeaders as header}
				<TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody class="divide-y">
			{#each searchTerm != '' || appliedFilters != null ? filteredItems : currentPageItems as item}
				{@render tableRow(item)}
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
