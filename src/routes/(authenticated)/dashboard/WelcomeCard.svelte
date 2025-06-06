<script lang="ts">
	import { page } from '$app/state';
	import { humanize } from '$lib/utils/strings';
	import { Badge, Card } from 'flowbite-svelte';
	import { ClockOutline } from 'flowbite-svelte-icons';
	import GetNextTicket from './GetNextTicket.svelte';
	import StartService from './StartService.svelte';
	import { _ } from 'svelte-i18n';
</script>

<Card class="text-center flex items-center" size="xl">
	<h5 class="mt-5 mb-3 text-3xl font-bold text-gray-800 dark:text-white">
		{$_('dashboard.welcomeMessage', { values: { name: humanize(page.data.session?.user.name ?? 'Guest') } })}
	</h5>
	<h1 class="mb-5 font-bold text-2xl text-gray-500 dark:text-gray-200">{$_('dashboard.haveANiceDay')}</h1>
	<Badge
		rounded
		class="h-8 mb-5 p-8 text-xl font-bold inline-flex items-center bg-gray-200 text-gray-600 dark:bg-green-900 dark:text-green-300 hover:bg-gray-300"
	>
		<ClockOutline size="xl" />
		<p class="ml-2 mr-10">{$_('dashboard.waitingTickets')}</p>
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
	</div>
</Card>
