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
	import { humanize } from '$lib/utils/strings';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let clients = $derived(data.clients);

	const clientsPath: string = $derived(`/clients/${data.clienttype}`);
	const description: string = 'Clients List';
	const title: string = `Better Teller - Manage Clients`;
	const subtitle: string = 'Manage Clients';
</script>

<MetaTag path={clientsPath} {description} {title} {subtitle} />

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Clients</BreadcrumbItem>
	<BreadcrumbItem>{humanize(data.clienttype)}</BreadcrumbItem>
</Breadcrumb>

<Pagination
	items={clients}
	searchPlaceholder="Search by CIF, EGN, Name, Email, Phone ..."
	fieldsToSearch={['cif', 'egn', 'name', 'email', 'phone']}
	filtersToApply={['status']}
	tableHeaders={['', 'Name', 'Contact', 'Mailing Address', 'Status', 'Actions']}
	{tableRow}
	{searchHeader}
/>

{#snippet searchHeader()}
	<Button size="sm" class="gap-2 whitespace-nowrap px-3" href="{clientsPath}/new">
		<UserAddOutline size="sm" />Add New Client
	</Button>
{/snippet}

{#snippet tableRow(client: any)}
	<TableBodyRow>
		<TableBodyCell class="w-4 p-4"><Checkbox class="chk" /></TableBodyCell>
		<TableBodyCell class="p-4">
			<Avatar
				src={client.avatar}
				href={`/clients/${client.type}/${client.cif}`}
				border
				class={client.status === 'Active'
					? 'ring-green-400 dark:ring-green-300'
					: 'ring-red-400 dark:ring-red-300'}
			/>
		</TableBodyCell>
		<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
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
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					{client.egn}
					<button use:copy={client.egn.toString()}>
						<FileCopyOutline size="sm" class="mr-2" />
					</button>
					<Tooltip placement="right" trigger="click" class="text-sm font-light">
						Copied EGN: {client.egn}
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
				<EyeSolid size="sm" /> View
			</Button>
			{#if client.status === 'Active'}
				<Button outline color="yellow" size="xs" class="gap-2 px-3">
					<LockTimeOutline size="sm" /> Suspend
				</Button>
				<Button outline color="red" size="xs" class="gap-2 px-3">
					<CloseOutline size="sm" /> Close
				</Button>
			{:else if client.status === 'Pending Activation' || client.status === 'Blocked' || client.status === 'Inactive' || client.status === 'Closed' || client.status === 'Suspended'}
				<Button outline color="green" size="xs" class="gap-2 px-3">
					<CheckOutline size="sm" /> Activate
				</Button>
			{/if}
		</TableBodyCell>
	</TableBodyRow>
{/snippet}
