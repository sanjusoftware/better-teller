<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		completeService,
		isServingClient,
		servingTicket
	} from '$lib/servicecontext.svelte';
	import { Button } from 'flowbite-svelte';
</script>

{#if isServingClient()}
	<div class="flex items-center space-x-1 ml-2">		
		<div>
			<form
				action="/dashboard?/endService"
				method="POST"
				class="flex items-center justify-center"
				use:enhance={() => {
					return ({ update }) => {
						update().finally(async () => {
							completeService()
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
