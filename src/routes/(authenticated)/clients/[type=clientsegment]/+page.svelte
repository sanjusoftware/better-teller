<script lang="ts">
	import Pagination from '$lib/utils/Pagination.svelte';
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import { copy } from 'svelte-copy';

	import {
		Avatar,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		TableBodyCell,
		TableBodyRow,
		Tooltip
	} from 'flowbite-svelte';
	import {
		CheckOutline,
		CloseOutline,
		EnvelopeOutline,
		EyeSolid,
		FileCopyOutline,
		LockTimeOutline,
		MailBoxOutline,
		PhoneOutline,
		UserAddOutline
	} from 'flowbite-svelte-icons';

	import MetaTag from '$lib/utils/MetaTag.svelte';
	import { _ } from 'svelte-i18n';

	import type { PageData } from './$types';
	import { clientProductSummaryPath } from '$lib/utils/pathHelper';
	let { data }: { data: PageData } = $props();
	let clients = $derived(data.clients);

	const clientsPath: string = $derived(`/clients/${data.clienttype}`);
	// MetaTag props could also be localized
	const description: string = 'Clients List'; // $_('clients.metaDescription')
	const title: string = `Better Teller - Manage Clients`; // $_('clients.metaTitle')
	const subtitle: string = 'Manage Clients'; // $_('clients.metaSubtitle')

	// For dynamic breadcrumb, consider passing data.clienttype to translation if needed
	// For now, using the generic 'clients.title'
	$: breadcrumbClientTitle = `${data.clienttype.toLocaleUpperCase()} ${$_('clients.title')}`;

	$: tableHeadersLocalized = [
		'', // Checkbox
		$_('clients.table.name'),
		$_('clients.table.contact'),
		$_('clients.table.mailingAddress'),
		$_('clients.table.status'),
		$_('common.actions')
	];
</script>

<MetaTag path={clientsPath} {description} {title} {subtitle} />

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href='/dashboard'>{$_('navbar.dashboard')}</BreadcrumbItem>
	<BreadcrumbItem href={clientsPath}>
		{breadcrumbClientTitle}
	</BreadcrumbItem>
</Breadcrumb>

<Pagination
	items={clients}
	searchPlaceholder={$_('clients.searchPlaceholder')}
	fieldsToSearch={['cif', 'egn', 'name', 'email', 'phone']}
	filtersToApply={['status']}
	tableHeaders={tableHeadersLocalized}
	{tableRow}
	{searchHeader}
/>

{#snippet searchHeader()}
	<Button size="sm" class="gap-2 whitespace-nowrap px-3" href="{clientsPath}/new">
		<UserAddOutline size="sm" />{$_('clients.newClientButton')}
	</Button>
{/snippet}

{#snippet tableRow(client: any)}
	<TableBodyRow>
		<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
		<TableBodyCell class="p-4">
			<Avatar
				src={client.avatar}
				href={clientProductSummaryPath(client)}
				border
				class={client.status === 'Active'
					? 'ring-green-400 dark:ring-green-300'
					: 'ring-red-400 dark:ring-red-300'}
			/>
		</TableBodyCell>
		<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				<div class="text-base font-semibold text-gray-900 dark:text-white">
					<a href={clientProductSummaryPath(client)}>
						{client.name}
					</a>
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					{$_('clients.cifLabel')} {client.cif}
					<button use:copy={client.cif.toString()}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right"  class="text-sm font-light">
						{$_('clients.copyCifTooltip')} {client.cif}
					</Tooltip>
				</div>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					{$_('clients.egnLabel')} {client.egn}
					<button use:copy={client.egn.toString()}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right" class="text-sm font-light">
						{$_('clients.copyEgnTooltip')} {client.egn}
					</Tooltip>
				</div>
			</div>
		</TableBodyCell>
		<TableBodyCell class="p-4">
			<div class="flex items-center space-x-2 text-sm font-normal">
				<PhoneOutline size="sm" class="text-gray-500 dark:text-gray-400" />
				<a href={`tel:${client.phone}`} class="hover:underline" aria-label="Call client">
					{client.phone}
				</a>
			</div>
			<div class="flex items-center space-x-2 text-sm font-normal">
				<EnvelopeOutline size="sm" class="text-gray-500 dark:text-gray-400" />
				<a href={`mailto:${client.email}`} class="hover:underline" aria-label="Email client">
					{client.email}
				</a>
			</div>
		</TableBodyCell>
		<TableBodyCell
			class="max-w-sm overflow-hidden truncate p-4 text-sm font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
		>
			<MailBoxOutline size="md" class="text-gray-500 dark:text-gray-400" />
			<span style="white-space: normal;">{client.address}</span>
		</TableBodyCell>
		<TableBodyCell class="p-4 font-normal">
			<div class="flex items-center gap-2">
				<StatusIndicator status={client.status} />
			</div>
		</TableBodyCell>
		<TableBodyCell class="space-x-2 p-4">
			<Button
				outline
				color="light"
				size="xs"
				class="gap-2 px-3"
				href={`/clients/${client.type}/${client.cif}`}
			>
				<EyeSolid size="sm" /> {$_('common.view')}
			</Button>
			{#if client.status === 'Active'}
				<Button outline color="yellow" size="xs" class="gap-2 px-3">
					<LockTimeOutline size="sm" /> {$_('clients.suspendButton')}
				</Button>
				<Button outline color="red" size="xs" class="gap-2 px-3">
					<CloseOutline size="sm" /> {$_('common.close')} {/* Or a more specific key */}
				</Button>
			{:else if client.status === 'Pending Activation' || client.status === 'Blocked' || client.status === 'Inactive' || client.status === 'Closed' || client.status === 'Suspended'}
				<Button outline color="green" size="xs" class="gap-2 px-3">
					<CheckOutline size="sm" /> {$_('clients.activateButton')}
				</Button>
			{/if}
		</TableBodyCell>
	</TableBodyRow>
{/snippet}
