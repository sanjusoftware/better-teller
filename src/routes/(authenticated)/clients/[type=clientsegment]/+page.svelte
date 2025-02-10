<script lang="ts">
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import { copy } from 'svelte-copy';

	import {
		Avatar,
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
		Tooltip
	} from 'flowbite-svelte';
	import {
		ChevronLeftOutline,
		ChevronRightOutline,
		EnvelopeOutline,
		FileCopyOutline,
		FilterSolid,
		MailBoxOutline,
		PhoneOutline,
		SearchOutline,
		UserAddOutline
	} from 'flowbite-svelte-icons';

	import MetaTag from '$lib/utils/MetaTag.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let clients = $derived(data.clients);

	const clientsPath: string = `/clients/${data.clienttype}`;
	const description: string = 'Clients List';
	const title: string = `Better Teller - Manage Clients`;
	const subtitle: string = 'Manage Clients';

	import { onMount } from 'svelte';

	let searchTerm = $state('');
	let currentPosition = $state(0);
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = $state(0);
	let pagesToShow: number[] = $state([]);
	let totalItems = $derived(clients.length);
	let startPage: number;
	let endPage = $state(0);
	let searchPlaceholder = 'Search by Name, Email, Phone, CIF, EGN, Country ...'

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
				client.cif.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		)
	);

	const toggleAll = (event: Event) => {
		const isChecked = (event.target as HTMLInputElement).checked;
		document.querySelectorAll('.chk').forEach((checkbox) => {
			(checkbox as HTMLInputElement).checked = isChecked;
		});
	};
</script>

<MetaTag path={clientsPath} {description} {title} {subtitle} />

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Clients</BreadcrumbItem>
	<BreadcrumbItem>{data.clienttype.toLocaleUpperCase()}</BreadcrumbItem>
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
	</div>

	<Table>
		<TableHead>
			<TableHeadCell class="!p-4"><Checkbox id="checkAll" on:change={toggleAll} /></TableHeadCell>
			{#each ['Name', 'Status', 'Type', 'Primary Contact', 'Email', 'Mailing Address'] as header}
				<TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody class="divide-y">
			{#each searchTerm != '' ? filteredItems : currentPageItems as client}
				<TableBodyRow>
					<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
					<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
						<Avatar
							src={client.avatar}
							href={`/clients/${client.type}/${client.cif}`}
							border
							class={client.status === 'Active'
								? 'ring-green-400 dark:ring-green-300'
								: 'ring-red-400 dark:ring-red-300'}
						/>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								<a href={`/clients/${client.type}/${client.cif}`}>
									{client.name}
								</a>
							</div>
							<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
								CIF: {client.cif}
								<button use:copy={client.cif.toString()}>
									<FileCopyOutline size="sm" class="mr-2" />
								</button>
								<Tooltip placement="right" trigger="click" class="text-sm font-light">
									Copied CIF: {client.cif}
								</Tooltip>
							</div>
						</div>
					</TableBodyCell>
					<TableBodyCell class="p-4 font-normal">
						<div class="flex items-center gap-2">
							<StatusIndicator status={client.status} />
						</div>
					</TableBodyCell>
					<TableBodyCell class="px-4 font-normal">
						{client.type.toLocaleUpperCase()}
					</TableBodyCell>
					<TableBodyCell class="p-4">
						<span class="flex items-center space-x-2">
							<PhoneOutline size="sm" class="text-gray-500 dark:text-gray-400" />
							<a href={`tel:${client.phone}`} class="hover:underline" aria-label="Call client">
								{client.phone}
							</a>
						</span>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							{client.country}
						</div>
					</TableBodyCell>
					<TableBodyCell class="px-4 font-normal">
						<span class="flex items-center space-x-2">
							<EnvelopeOutline size="sm" class="text-gray-500 dark:text-gray-400" />
							<a href={`mailto:${client.email}`} class="hover:underline" aria-label="Email client">
								{client.email}
							</a>
						</span>
					</TableBodyCell>
					<TableBodyCell class="px-4 font-normal text-gray-500 dark:text-gray-400">
						<span class="flex items-center space-x-2">
							<MailBoxOutline size="md" class="text-gray-500 dark:text-gray-400" />
							{client.address}
						</span>
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
