<script lang="ts">
	import { getCurrentClient, isCurrentClient } from '$lib/servicecontext.svelte';
	import { Avatar, Badge } from 'flowbite-svelte';
	import CompleteService from './CompleteService.svelte';
	import { clientProductSummaryPath } from '$lib/utils/pathHelper';
	let currentClient = getCurrentClient();
</script>

{#if isCurrentClient()}
	<Badge rounded color="dark" class="p-2">
		<div class="flex items-center space-x-2">
			<a href={clientProductSummaryPath(currentClient)} class="flex items-center space-x-2">
				<Avatar alt="Client Avatar" src={currentClient.avatar} size="sm" />
				<div class="flex flex-col justify-center">
					<span class="text-xs text-gray-500">Serving Client:</span>
					<span class="text-xs font-bold">{currentClient.name}</span>
				</div>
			</a>
			<CompleteService />
		</div>
	</Badge>
{/if}
