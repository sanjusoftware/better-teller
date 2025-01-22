<script lang="ts">
	import {
		Avatar,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Heading,
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
		DownloadSolid,
		EyeSolid,
		PlusOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import Client from './Client.svelte';
	import Delete from './Delete.svelte';
	import MetaTag from '../../../utils/MetaTag.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let openUser = $state(false); // modal control
	let openDelete =$state(false); // modal control
	let current_user = $state({});
	
	const clientsPath: string = `/clients/${data.clienttype.toLowerCase()}`;
	const description: string = 'Clients Dashboard';
	const title: string = `Better Teller - Manage Clients`;
	const subtitle: string = 'Manage Clients';
</script>

<MetaTag path={clientsPath} {description} {title} {subtitle} />

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home href="/">Home</BreadcrumbItem>
			<BreadcrumbItem>Clients</BreadcrumbItem>
			<BreadcrumbItem href={clientsPath}>{data.clienttype}</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
			{data.clienttype} Clients
		</Heading>

		<Toolbar embedded class="w-full py-4 text-gray-500  dark:text-gray-400">
			<Input placeholder="Search for users" class="me-4 w-80 border xl:w-96" />

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
			{#each ['Name', 'Type', 'Country', 'Status', 'Actions'] as title}
				<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each data.clients as client}
				<TableBodyRow class="text-base">
					<TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell>
					<TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
						<Avatar border />
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								<a href={`/clients/${data.clienttype.toLowerCase()}/profile/${client.id}`}>
									{client.name}
								</a>
							</div>
							<div class="text-sm font-normal text-gray-500 dark:text-gray-400">{client.email}</div>
						</div>
					</TableBodyCell>
					<TableBodyCell
						class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-400"
					>
						{client.type.toLocaleUpperCase()}
					</TableBodyCell>
					<TableBodyCell class="p-4">{client.country}</TableBodyCell>
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
							href={`/clients/${data.clienttype.toLowerCase()}/profile/${client.id}`}
						>
							<EyeSolid size="sm" /> View
						</Button>
						<Button
							color="red"
							size="sm"
							class="gap-2 px-3"
							on:click={() => ((current_user = client), (openDelete = true))}
						>
							<TrashBinSolid size="sm" /> Delete
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</main>

<!-- Modals -->

<Client bind:open={openUser} data={current_user} />
<Delete bind:open={openDelete} />
