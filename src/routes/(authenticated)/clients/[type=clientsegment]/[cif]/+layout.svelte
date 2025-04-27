<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import ClientInfoCard from './ClientInfoCard.svelte';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
    let client = $derived(data.client);
</script>

<div class="grid grid-cols-7 gap-4">
	<div class="col-span-5">
        {@render children()}
	</div>
	<div class="col-span-2">
		<ClientInfoCard {client} />
	</div>
</div>