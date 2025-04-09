<script lang="ts">
	import { Avatar, Button, Card, Heading } from 'flowbite-svelte';
	import { BuildingOutline, ClockOutline, EnvelopeOutline, PhoneOutline } from 'flowbite-svelte-icons';

	let { user } = $props();
</script>

<Card
	size="none"
	class="block shadow-sm sm:flex sm:space-x-4 sm:py-6 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4"
	horizontal
>
	<div class="flex items-center space-x-4 rtl:space-x-reverse">
		<Avatar src={user.image || undefined} rounded border size='xl' />
		<div class="space-y-1 font-small dark:text-white">
			<Heading tag="h3" class="text-xl">
				{user.name}
			</Heading>
			<div class="text-sm text-gray-500 dark:text-gray-400">
				Employee ID: {user.id || 'B0050605'}
			</div>
			<span class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
				<EnvelopeOutline size="sm" class="text-gray-500 dark:text-gray-400" />
				<p class="ml-10">{user.email}</p>
			</span>
			<span class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
				<PhoneOutline size="sm" class="text-gray-500 dark:text-gray-400" />
				<p class="ml-10">{user.phone || 'Unknown'}</p>				
			</span>
			<span class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
				<BuildingOutline size="sm" class="text-gray-500 dark:text-gray-400" />
				<p class="ml-10">{user.branch || 'Sofia'}</p>				
			</span>
		</div>
	</div>
	<div class="pt-5">
		<div class="mb-4 flex items-center justify-between">
			<span
				class="h-8 bg-orange-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300"
			>
				<ClockOutline class="w-3 h-3 me-1.5" />
				40 clients waiting
			</span>
			<Button outline size="xs" class="px-3">Get Next Client</Button>
		</div>
	</div>
</Card>
