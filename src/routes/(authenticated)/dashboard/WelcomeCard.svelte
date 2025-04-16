<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { humanize } from '$lib/utils/strings';
	import { Badge, Button, Card } from 'flowbite-svelte';
	import {
		ClockOutline,
		UserCircleOutline
	} from 'flowbite-svelte-icons';
	
</script>

<Card class="text-center flex items-center" size="xl">
	<h5 class="mt-10 mb-3 text-3xl font-bold text-gray-800 dark:text-white">
		Welcome {humanize(page.data.session?.user.name ?? 'Guest')}
	</h5>
	<h1 class="mb-8 font-bold text-2xl text-gray-500 dark:text-gray-200">Have a nice day!</h1>
	<Button pill class="h-8 mb-10 p-8 text-2xl font-bold inline-flex items-center bg-gray-200 text-gray-600 dark:bg-green-900 dark:text-green-300 hover:bg-gray-300">
		<ClockOutline size="xl" />
		<p class="ml-2 mr-10">Waiting Tickets</p>
		<Badge rounded class="w-8 h-8 ms-2 p-0 font-bold text-primary-800 bg-white dark:text-primary-800 dark:bg-white">40</Badge>
	  </Button>
	<div
		class="mb-10 justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"
	>
		<form method="post" use:enhance action="?/getNextTicket">
			<Button pill size="xl" type="submit" class="w-full"><UserCircleOutline class="w-6 h-6 me-2" />Get Next Ticket</Button>
		</form>
	</div>
</Card>
