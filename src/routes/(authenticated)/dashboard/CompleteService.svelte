<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		currentClient,
		nextTicket,
		servingTicket
	} from '$lib/servicecontext.svelte';
	import { Button } from 'flowbite-svelte';
</script>

{#if servingTicket.current != ''}
	<div class="flex items-center space-x-1 ml-2">		
		<div>
			<form
				action="/dashboard?/endService"
				method="POST"
				class="flex items-center justify-center"
				use:enhance={() => {
					return ({ update }) => {
						update().finally(async () => {
							servingTicket.current = '';
							nextTicket.current = '';
							currentClient.current = JSON.stringify({});
						});
					};
				}}
			>
				<input type="hidden" name="ticket" value={servingTicket.current} />
				<Button pill size="xs" class="px-3" type="submit">Complete Service</Button>
			</form>
		</div>
	</div>
{/if}
