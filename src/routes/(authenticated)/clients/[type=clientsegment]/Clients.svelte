<script lang="ts">
	import StatusIndicator from '$lib/utils/StatusIndicator.svelte';
	import {
		Avatar,
		Checkbox,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { PhoneOutline } from 'flowbite-svelte-icons';

	const headers = ['Name', 'CIF', 'Status', 'Type', 'Primary Contact', 'Mailing Address'];
	export let clients: {
		cif: number;
		name: string;
		avatar: string;
		email: string;
		address: string;
		position: string;
		country: string;
		status: string;
		type: string;
		phone: string;
	}[];

	const toggleAll = (event: Event) => {
		const isChecked = (event.target as HTMLInputElement).checked;
		document.querySelectorAll('.chk').forEach((checkbox) => {
			(checkbox as HTMLInputElement).checked = isChecked;
		});
	};
</script>

<TableHead>
	<TableHeadCell class="!p-4"><Checkbox id="checkAll" on:change={toggleAll} /></TableHeadCell>
	{#each headers as header}
		<TableHeadCell padding="px-4 py-3" scope="col">{header}</TableHeadCell>
	{/each}
</TableHead>
<TableBody class="divide-y">
	{#each clients as client}
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
						{client.email}
					</div>
				</div>
			</TableBodyCell>
			<TableBodyCell class="px-4 font-normal">{client.cif}</TableBodyCell>
			<TableBodyCell class="p-4 font-normal">
				<div class="flex items-center gap-2">
					<StatusIndicator status={client.status} />
				</div>
			</TableBodyCell>
			<TableBodyCell class="px-4 font-normal">{client.type.toLocaleUpperCase()}</TableBodyCell>
			<TableBodyCell class="p-4">
				<span class="flex items-center space-x-2">
					<a href={`tel:${client.phone}`} class="hover:underline" aria-label="Call client">
						{client.phone}
					</a>
					<PhoneOutline size="md" class="text-gray-500 dark:text-gray-400" />
				</span>
				<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
					{client.country}
				</div>
			</TableBodyCell>
			<TableBodyCell class="px-4 font-normal text-gray-500 dark:text-gray-400">{client.address}</TableBodyCell>
		</TableBodyRow>
	{/each}
</TableBody>
