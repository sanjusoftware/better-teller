<script lang="ts">
	import {
		Avatar,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Indicator,
		Input,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Toolbar
	} from 'flowbite-svelte';
	import {
		BanOutline,
		DownloadSolid,
		PlusOutline,
		ProfileCardOutline
	} from 'flowbite-svelte-icons';

	import Client from './Client.svelte';
	import Delete from './Delete.svelte';
	import MetaTag from '../../../utils/MetaTag.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let openUser = $state(false); // modal control
	let openDelete = $state(false); // modal control
	let current_user = $state({});

	const clientsPath: string = `/clients/${data.clienttype.toLowerCase()}`;
	const description: string = 'Clients List';
	const title: string = `Better Teller - Manage Clients`;
	const subtitle: string = 'Manage Clients';
</script>

<MetaTag path={clientsPath} {description} {title} {subtitle} />

<div class="p-4">
	<Breadcrumb class="mb-5">
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem>Clients</BreadcrumbItem>
		<BreadcrumbItem href={clientsPath}>{data.clienttype}</BreadcrumbItem>
	</Breadcrumb>

	<Toolbar embedded class="w-full py-4 text-gray-500  dark:text-gray-400">
		<Input placeholder="Search by Name, CIF, Email, Phone, EGN etc. ..." class="me-4 w-80 border xl:w-96" />

		<div slot="end" class="flex items-center space-x-2">
			<Button
				size="sm"
				class="gap-2 whitespace-nowrap px-3"
				on:click={() => ((current_user = {}), (openUser = true))}
			>
				<PlusOutline size="sm" />Add New
			</Button>
			<Button size="sm" color="alternative" class="gap-2 px-3">
				<DownloadSolid size="md" class="-ml-1" />Export
			</Button>
		</div>
	</Toolbar>
</div>
<Table>
	<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
		<TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell>
		{#each ['Name', 'Country/Phone', 'Status', 'Actions'] as title}
			<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each data.clients as client}
			<TableBodyRow class="text-base">
				<TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell>
				<TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
					<Avatar
						src={client.avatar}
						border
						class={client.status === 'Active'
							? 'ring-green-400 dark:ring-green-300'
							: 'ring-red-400 dark:ring-red-300'}
					/>
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
						<div class="text-base font-semibold text-gray-900 dark:text-white">
							<a href={`/clients/${data.clienttype.toLowerCase()}/${client.id}`}>
								{client.name}
							</a>
						</div>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">{client.email}</div>
					</div>
				</TableBodyCell>
				<TableBodyCell class="p-4">
					{client.country}
					<div class="text-sm font-normal text-gray-500 dark:text-gray-400">{client.phone}</div>
				</TableBodyCell>
				<TableBodyCell class="p-4 font-normal">
					<div class="flex items-center gap-2">
						<Indicator color={client.status === 'Active' ? 'green' : 'red'} />
						{client.status}
					</div>
				</TableBodyCell>
				<TableBodyCell class="space-x-2 p-4">
					<Button
						size="sm"
						class="gap-2 px-3"
						href={`/clients/${data.clienttype.toLowerCase()}/${client.id}`}
					>
						<ProfileCardOutline size="sm" /> Profile
					</Button>
					{#if client.status === 'Active'}
						<Button color="red" size="sm" class="gap-2 px-3"
						on:click={() => ((current_user = client), (openDelete = true))}>
							<BanOutline size="sm" /> Suspend
						</Button>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<!-- Modals -->

<Client bind:open={openUser} data={current_user} />
<Delete bind:open={openDelete} />
