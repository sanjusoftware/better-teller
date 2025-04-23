<script lang="ts">
	import { enhance } from '$app/forms';
	import {servingTicket, nextTicket} from '$lib/servicecontext.svelte'
	import { Button } from 'flowbite-svelte';
	import { AngleRightOutline } from 'flowbite-svelte-icons';
</script>

{#if servingTicket.current === ''}
	<form
		action="?/getNextTicket"
		method="POST"
		class="flex items-center justify-center"
		use:enhance={() => {
			return ({ result, update }) => {
				update().finally(async () => {
					if (result.type === 'success') {
						console.log('Ticket acquired: ', result.data?.ticket);
						nextTicket.current = result.data?.ticket
					} else {
						new Error('Error aquiring ticket: ' + result.status);
					}
				});
			};
		}}
	>
		<Button
			pill
			class="mt-5 h-15 text-md inline-flex items-center dark:bg-green-900 dark:text-green-300"
			type="submit"
		>
			Get Next Ticket
			<AngleRightOutline size="md" class="w-5 h-5 ms-2" />
		</Button>
	</form>
{/if}
