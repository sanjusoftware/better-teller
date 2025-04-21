<script lang="ts">
	import { deserialize, enhance } from '$app/forms';
	import { page } from '$app/state';
	import { humanize } from '$lib/utils/strings';
	import { Badge, Button, Card } from 'flowbite-svelte';
	import { AngleRightOutline, ClockOutline } from 'flowbite-svelte-icons';

	import { servingTicket, ticket } from '$lib/store';
	import type { ActionResult } from '@sveltejs/kit';

	console.log('form data:', page.form?.data);

	async function getNextTicket() {
		const response = await fetch('api/tickets');
		$ticket = await response.json();
	}

	async function startService() {
		const data = new FormData();
		if ($ticket) {
			data.append('ticket', $ticket);
		}
		const response = await fetch('?/startService', {
			method: 'POST',
			body: data
		});
		const result: ActionResult = deserialize(await response.text());
		if (result.type === 'success') {
			$servingTicket = result.data?.ticket;
		} else {
			new Error('Error starting service: ' + result.status);
		}
	}
</script>

<Card class="h-full text-center flex items-center" size="xl">
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
	{#if $servingTicket}
		<Button pill color="red" size="xs" class="px-3">Complete Service - {$servingTicket}</Button>
	{:else}
		<div class="mb-5 space-y-4 sm:space-y-0 sm:space-x-4">
			<Button
				pill
				on:click={getNextTicket}
				class="mt-5 h-15 text-md inline-flex items-center dark:bg-green-900 dark:text-green-300"
				type="submit"
			>
				Get Next Ticket
				<AngleRightOutline size="md" class="w-5 h-5 ms-2" />
			</Button>
			{#if $ticket}
				<div>
					<Button
						pill
						on:click={startService}
						outline
						color="light"
						class="mt-5 text-md font-medium inline-flex items-center bg-gray-200 text-gray-800 dark:bg-green-900 dark:text-green-300"
						type="submit"
					>
						<Badge
							rounded
							class="mr-5 h-8 p-2 text-sm font-medium text-gray-800 bg-white dark:text-primary-800 dark:bg-white"
						>
							Got Ticket: {$ticket}
						</Badge>
						Start Service
					</Button>
				</div>
			{/if}
		</div>
	{/if}
</Card>
