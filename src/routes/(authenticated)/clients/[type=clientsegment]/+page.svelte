<script lang="ts">
  import Clients from './Clients.svelte';

	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		ButtonGroup,
		Checkbox,
		Dropdown,
		TableBody,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { UserAddOutline } from 'flowbite-svelte-icons';

	import MetaTag from '$lib/utils/MetaTag.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const clientsPath: string = `/clients/${data.clienttype.toLowerCase()}`;
	const description: string = 'Clients List';
	const title: string = `Better Teller - Manage Clients`;
	const subtitle: string = 'Manage Clients';

	import { ChevronLeftOutline, ChevronRightOutline, FilterSolid } from 'flowbite-svelte-icons';

	import { Section } from 'flowbite-svelte-blocks';
	import { onMount } from 'svelte';
	let clients = $derived(data.clients);	

	let searchTerm = $state('');
	let currentPosition = $state(0);
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = $state(0);
	let pagesToShow: number[] = $state([]);
	let totalItems = $derived(clients.length);
	let startPage: number;
	let endPage = $state(0);

	const updateDataAndPagination = () => {
		clients.slice(currentPosition, currentPosition + itemsPerPage);
		renderPagination();
	};

	const loadNextPage = () => {
		if (currentPosition + itemsPerPage < clients.length) {
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

	const currentPageItems = $derived(clients.slice(currentPosition, currentPosition + itemsPerPage));
	const filteredItems = $derived(
		clients.filter(
			(client) =>
				client.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				client.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				client.phone.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				client.country.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		)		
	);

	let divClass = 'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
	let innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	let searchClass = 'w-full md:w-1/2 relative';
	let classInput =
		'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 pl-10';
</script>

<MetaTag path={clientsPath} {description} {title} {subtitle} />

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Clients</BreadcrumbItem>
	<BreadcrumbItem>{data.clienttype}</BreadcrumbItem>
</Breadcrumb>

<Section name="advancedTable" classSection="bg-gray-50 dark:bg-gray-900 p-3">
	<TableSearch
		placeholder="Search by Name, Email, Phone, CIF, EGN, Country ..."
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
			<Button size="sm" class="gap-2 whitespace-nowrap px-3" href="{clientsPath}/new">
				<UserAddOutline size="sm" />Add New Client
			</Button>
			<Button color="alternative">Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
			<Dropdown class="w-48 p-3 space-y-2 text-sm">
				<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Show only:</h6>
				<li>
					<Checkbox>Active (56)</Checkbox>
				</li>
				<li>
					<Checkbox>Inactive (16)</Checkbox>
				</li>
			</Dropdown>
		</div>		
		<Clients clients={searchTerm !== '' ? filteredItems : currentPageItems}/>
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
