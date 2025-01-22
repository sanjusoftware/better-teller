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
		Toolbar,
		ToolbarButton
	} from 'flowbite-svelte';
	import {
		CogSolid,
		DotsVerticalOutline,
		DownloadSolid,
		EditOutline,
		ExclamationCircleSolid,
		PlusOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import Clients from '../../../data/clients.json';
	import { imagesPath } from '../../../utils/variables';

	import Client from './Client.svelte';
	import Delete from './Delete.svelte';
	import MetaTag from '../../../utils/MetaTag.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let openUser: boolean = false; // modal control
	let openDelete: boolean = false; // modal control

	let current_user: any = {};
	const path: string = `/clients/${data.clienttype.toLowerCase()}`;
	const description: string = 'Clients Dashboard';
	const title: string = `Better Teller - Manage Clients`;
	const subtitle: string = 'Manage Clients';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home>Clients</BreadcrumbItem>
			<BreadcrumbItem href={path}>{data.clienttype}</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
			All {data.clienttype} Clients
		</Heading>

		<Toolbar embedded class="w-full py-4 text-gray-500  dark:text-gray-400">
			<Input placeholder="Search for users" class="me-4 w-80 border xl:w-96" />
			<div class="border-l border-gray-100 pl-2 dark:border-gray-700">
				<ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<CogSolid size="lg" />
				</ToolbarButton>
				<ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<TrashBinSolid size="lg" />
				</ToolbarButton>
				<ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<ExclamationCircleSolid size="lg" />
				</ToolbarButton>
				<ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<DotsVerticalOutline size="lg" />
				</ToolbarButton>
			</div>

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
						<Avatar src={imagesPath(client.avatar, 'users')} />
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">{client.name}</div>
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
							on:click={() => ((current_user = client), (openUser = true))}
						>
							<EditOutline size="sm" /> Edit user
						</Button>
						<Button
							color="red"
							size="sm"
							class="gap-2 px-3"
							on:click={() => ((current_user = client), (openDelete = true))}
						>
							<TrashBinSolid size="sm" /> Delete user
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
