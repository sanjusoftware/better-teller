<script lang="ts">
	import {servingTicket, nextTicket, currentClient} from '$lib/servicecontext.svelte'
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
</script>

{#if servingTicket.current != ''}
	<div class="ml-2">
		<form
			action="/dashboard?/endService"
			method="POST"
			class="flex items-center justify-center"
			use:enhance={() => {
				return ({ update }) => {
					update().finally(async () => {
						servingTicket.current = ''
						nextTicket.current = ''
						currentClient.current = JSON.stringify({})
					});
				};
			}}
		>
			<input type="hidden" name="ticket" value={servingTicket.current} />
			<Button pill color="red" size="xs" class="px-3" type="submit">Complete Service - {servingTicket.current}</Button>
		</form>
	</div>
{/if}
