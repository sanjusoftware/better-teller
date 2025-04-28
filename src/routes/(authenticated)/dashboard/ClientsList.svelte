<script lang="ts">
	import { Avatar, Badge, Listgroup, Tooltip } from 'flowbite-svelte';
	import { ClockOutline, FileCopyOutline } from 'flowbite-svelte-icons';
	import { copy } from 'svelte-copy';
	import { clientProductSummaryPath } from '$lib/utils/pathHelper';

	let { clientsServed }: { clientsServed: { avatar: string; type: string; cif: string; name: string; status: string }[] } = $props();
</script>

<Listgroup items={clientsServed} let:item={client} class="border-0 dark:bg-gray-800">
	<div class="flex items-center space-x-4 rtl:space-x-reverse">
		<Avatar
			src={client.avatar}
			href={clientProductSummaryPath(client)}
			border
			class={client.status === 'Active'
				? 'ring-green-400 dark:ring-green-300'
				: 'ring-red-400 dark:ring-red-300'}
		/>
		<div class="flex-1 min-w-0">
			<p class="text-sm font-medium text-gray-900 truncate dark:text-white">
				<a href={clientProductSummaryPath(client)}>
					{client.name}
				</a>
			</p>
			<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
				CIF: {client.cif}
				<button use:copy={client.cif.toString()}>
					<FileCopyOutline size="sm" class="mr-2" />
				</button>
				<Tooltip placement="right"  class="text-sm font-light">
					Copy CIF: {client.cif}
				</Tooltip>
			</div>
		</div>
		<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
			<span class="text-sm font-normal text-gray-500 dark:text-gray-400">
				Serving Time: <Badge rounded><ClockOutline class="w-2.5 h-2.5 me-1.5" />5 mins</Badge>
			</span>
		</div>
	</div>
</Listgroup>
