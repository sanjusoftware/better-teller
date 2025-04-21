<script lang="ts">
	import { page } from '$app/state';
	import CompleteService from './CompleteService.svelte';
	import GetNextTicket from './GetNextTicket.svelte';
	import StartService from './StartService.svelte';
	import { humanize } from '$lib/utils/strings';
	import { Badge, Card } from 'flowbite-svelte';
	import { ClockOutline } from 'flowbite-svelte-icons';
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
		<GetNextTicket />
		<StartService />
		<CompleteService />
	</div>
</Card>
