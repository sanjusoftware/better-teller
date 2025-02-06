<script lang="ts">
	import { Badge } from 'flowbite-svelte';

	export let status: string;
</script>

<div class="flex items-center gap-2">
	{#if status === 'completed'}
		<Badge color="green">{status}</Badge>
	{:else if status === 'cancelled'}
		<Badge color="red">{status}</Badge>
	{:else if status === 'inreview'}
		<Badge color="yellow">{status}</Badge>
	{:else if status === 'inprogress'}
		<Badge color="purple">{status}</Badge>
	{/if}
</div>
