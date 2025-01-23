<script lang="ts">
	import { Avatar, Button, Card, Heading } from 'flowbite-svelte';
	import { UploadSolid } from 'flowbite-svelte-icons';
	export let client: {
		avatar: string;
		name: string;
		email: string;
		country: string;
		status: string;
	};
</script>

<Card
	size="xl"
	class="block shadow-sm sm:flex sm:space-x-4 sm:py-6 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4"
	horizontal
>
	<div class="flex items-center space-x-4 rtl:space-x-reverse">
		<Avatar src="/images/profile.jpg" class="mb-4 h-28 w-28 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0" rounded border size="none"/>
		<div class="space-y-1 font-medium dark:text-white">
			<Heading tag="h3" class="text-xl">{client.name}</Heading>
			<div class="text-sm text-gray-500 dark:text-gray-400">{client.email}</div>
			<div class="text-sm text-gray-500 dark:text-gray-400">+359 1286432</div>
		</div>
	</div>
	<div class="py-0.5">		
		<div class="flex items-center space-x-4">
			<Button size="sm" class="px-3">
				<UploadSolid size="sm" class="-ms-1 me-2" /> Upload picture
			</Button>
		</div>
		<p class="mb-4 mt-1 pt-px text-sm">JPG, GIF or PNG. Max size of 800K</p>
	</div>
</Card>
