<script lang="ts">
	import { servingTicket, ticket } from '$lib/store';
	import { Button } from 'flowbite-svelte';
	import '../../app.css';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
</script>

{#if $servingTicket}
	{#if page.form?.message}
		<div class="text-center text-sm text-red-500">
			{page.form?.message}
		</div>
	{/if}
	<form
		action="/dashboard?/endService"
		method="POST"
		class="flex items-center justify-center"
		use:enhance={() => {
			return ({ update }) => {
				update().finally(async () => {
					$servingTicket = null;
					$ticket = null;
				});
			};
		}}
	>
		<input type="hidden" name="ticket" value={$servingTicket} />
		<Button pill color="red" size="xs" class="px-3" type="submit">
			Complete Service - {$servingTicket}
		</Button>
	</form>
{/if}
