<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { humanize } from '$lib/utils/strings';
	import { Badge, Button, Card } from 'flowbite-svelte';
	import { AngleRightOutline, ClockOutline } from 'flowbite-svelte-icons';

	let ticket: { ticket: string } = $props();
	let ticketValue = $derived(ticket.ticket);
</script>

<Card class="text-center flex items-center" size="xl">
	<h5 class="mt-5 mb-3 text-3xl font-bold text-gray-800 dark:text-white">
		Welcome {humanize(page.data.session?.user.name ?? 'Guest')}
	</h5>
	<h1 class="mb-5 font-bold text-2xl text-gray-500 dark:text-gray-200">Have a nice day!</h1>

	<Badge
		rounded
		class="h-8 mb-5 p-8 text-xl font-bold inline-flex items-center bg-gray-200 text-gray-600 dark:bg-green-900 dark:text-green-300 hover:bg-gray-300"
	>
		<ClockOutline size="xl" />
		<p class="ml-2 mr-10">Waiting Tickets</p>
		<Badge
			rounded
			class="w-8 h-8 ms-2 p-0 font-bold text-primary-800 bg-white dark:text-primary-800 dark:bg-white"
		>
			40
		</Badge>
	</Badge>
	<div class="mb-5 space-y-4 sm:space-y-0 sm:space-x-4">
		<form method="post" use:enhance action="?/getNextTicket">
			<input hidden value={ticketValue} />
			<Button
				pill
				class="mt-5 text-md inline-flex items-center dark:bg-green-900 dark:text-green-300"
				type="submit"
			>
				Get Next Ticket
				<AngleRightOutline size="md" class="w-5 h-5 ms-2" />
			</Button>
		</form>
		{#if ticket}
			<div>
				<form method="post" use:enhance action="?/startService">
					<input hidden value={ticketValue} />
					<Button
						pill
						outline
						color="light"
						class="mt-5 text-md font-medium inline-flex items-center bg-gray-200 text-gray-800 dark:bg-green-900 dark:text-green-300"
						type="submit"
					>
						Start Service 
						<Badge
							rounded
							class="h-8 ms-2 p-2 text-md font-medium text-gray-800 bg-white dark:text-primary-800 dark:bg-white"
						>
						Ticket: {ticketValue}
						</Badge>
					</Button>
				</form>
			</div>
		{/if}
	</div>
</Card>
