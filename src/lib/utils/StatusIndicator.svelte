<script lang="ts">
	import { Indicator } from 'flowbite-svelte';

	export let status: string;
</script>

<div class="flex items-center gap-2">
	{#if status === 'Active' || status === 'Verified'}
		<Indicator color="green" />
	{:else if status === 'Defaulted' || status === 'Pending Activation' || status === 'Pending Verification'}
		<Indicator color="yellow" />
	{:else if status === 'NPA' || status === 'Blocked' || status === 'Rejected' }
		<Indicator color="red" />
	{:else if status === 'Closed' || status === 'Expired' || status === 'In Active'}
		<Indicator color="gray" />
	{/if}
	<span class="text-sm">{status}</span>
</div>
