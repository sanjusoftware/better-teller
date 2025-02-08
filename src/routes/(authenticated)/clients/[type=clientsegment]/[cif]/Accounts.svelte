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
		TableSearch,
		Tooltip
	} from 'flowbite-svelte';
	import {
		ChartMixedDollarOutline,
		ChevronLeftOutline,
		ChevronRightOutline,
		CloseOutline,
		DownloadOutline,
		EyeSolid,
		FileCopyOutline,
		FilterSolid,
		LockTimeOutline,
		SalePercentOutline,
		WalletOutline
	} from 'flowbite-svelte-icons';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let accounts = data.Accounts;
	let client = data.client;

	import { onMount } from 'svelte';

	let searchTerm = $state('');
	let currentPosition = $state(0);
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = $state(0);
	let pagesToShow: number[] = $state([]);
	let totalItems = $derived(accounts.length);
	let startPage: number;
	let endPage = $state(0);

	const updateDataAndPagination = () => {
		accounts.slice(currentPosition, currentPosition + itemsPerPage);
		renderPagination();
	};

	const loadNextPage = () => {
		if (currentPosition + itemsPerPage < accounts.length) {
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
		accounts.slice(currentPosition, currentPosition + itemsPerPage)
	);
	const filteredItems = $derived(
		accounts.filter(
			(account) =>
				account.accountNumber.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				account.iban.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
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
	placeholder="Search Account Number or IBAN ..."
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
			href={`/clients/${client.type}/${client.cif}/accounts/new`}
		>
			<WalletOutline size="sm" />Open New Account
		</Button>
		<Button color="alternative">Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
		<Dropdown class="w-48 p-3 space-y-2 text-sm">
			<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Show only:</h6>
			<li>
				<Checkbox>Checking (5)</Checkbox>
			</li>
			<li>
				<Checkbox>Savings (16)</Checkbox>
			</li>
		</Dropdown>
	</div>
	<TableHead>
		<TableHeadCell class="!p-4"><Checkbox id="checkAll" on:change={toggleAll} /></TableHeadCell>
		{#each ['Account Number', 'CIF', 'Type', 'Balance', 'Opened', 'Status', 'Card', 'Actions'] as header}
			<TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody class="divide-y">
		{#each searchTerm != '' ? filteredItems : currentPageItems as account}
			<TableBodyRow class="text-base">
				<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
				<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<div class="text-base font-semibold text-gray-900 dark:text-white">
							<a href="/transactions" class="hover:underline">
								{account.accountNumber}
							</a>
							<button use:copy={account.accountNumber}>
								<FileCopyOutline size="sm" class="mr-2" />
							</button>
							<Tooltip placement="right" trigger="click" class="text-sm font-light">
								Copied account number: {account.accountNumber}
							</Tooltip>
						</div>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							IBAN: {account.iban}
							<button use:copy={account.iban}>
								<FileCopyOutline size="sm" class="mr-2" />
							</button>
							<Tooltip placement="right" trigger="click" class="text-sm font-light">
								Copied IBAN: {account.iban}
							</Tooltip>
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal p-4">
					{account.customerId}
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					{#if account.type === 'Loan'}
						<ChartMixedDollarOutline class="mr-2" />
					{:else}
						<SalePercentOutline class="mr-2" />
					{/if}
					{account.type}
				</TableBodyCell>
				<TableBodyCell
					class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
				>
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<div class="text-base font-semibold text-gray-900 dark:text-white">
							{account.balance.toLocaleString()}
						</div>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							{account.currency}
						</div>
					</div>
				</TableBodyCell>
				<TableBodyCell class="text-sm font-normal text-gray-500 dark:text-gray-400 p-4">
					{dayjs('19/04/2019', 'DD/MM/YYYY', true).format('lll')}
				</TableBodyCell>
				<TableBodyCell class="p-4 font-normal">
					<StatusIndicator status={account.status} />
				</TableBodyCell>
				<TableBodyCell class="p-4 font-normal">
					{account.card_issued ? 'Yes' : 'No'}
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
					<Button outline color="yellow" size="xs" class="gap-2 px-3">
						<LockTimeOutline size="sm" /> Suspend
					</Button>
					<Button outline color="red" size="xs" class="gap-2 px-3">
						<CloseOutline size="sm" /> Close
					</Button>
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

{#if accounts.length === 0}
	<div class="p-4 text-center text-gray-500 dark:text-gray-400">
		<h1>No accounts opened.</h1>
	</div>
{/if}
