<script lang="ts">
	export let status: string;

	// random assignment to issuer type
	// $: type = status === 'Active' ? 'Active' : 'Mastercard';
</script>

{#if status === 'Active'}
	<Indicator color="green" />
{:else if status === 'Pending Activation'}
	<Indicator color="yellow" />
{:else if status === 'Blocked'}
	<Indicator color="red" />
{:else if status === 'Expired'}
	<Indicator color="gray" />
{/if}
