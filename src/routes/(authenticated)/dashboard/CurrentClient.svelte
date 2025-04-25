<script lang="ts">
	import {
		currentClient,
		currentClientPath,
		isCurrentClient
	} from '$lib/servicecontext.svelte';
	import { Button } from 'flowbite-svelte';
</script>

{#if isCurrentClient()}
	<div>
		<Button outline pill size="xs" href={currentClientPath()} class="inline-flex items-center">
			Serving: {currentClient.current.name}
		</Button>
	</div>
{/if}
