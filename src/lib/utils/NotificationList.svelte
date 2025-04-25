<script>
	import { Button, Popover } from 'flowbite-svelte';
	import { BellSolid, EyeSolid } from 'flowbite-svelte-icons';
	import Notification from './Notification.svelte';

	let notifications = [
		{
			sender: 'Tamas Hak-Kovacs',
			time: 'a few moments ago',
			message: 'When can I get an update on the loan application # 12324342?'
		},
		{
			sender: 'Petko Rangelov',
			time: 'a few moments ago',
			message: 'We need to keep cash ready for the Euro adaption day!!'
		},
		{
			sender: 'Sanjeev Mishra',
			time: 'a few moments ago',
			message: 'Perhaps we can complete this project at the end :)'
		}
	];
</script>

<div id="bell" class="inline-flex items-center text-sm focus:outline-hidden hover:cursor-pointer">
	<BellSolid size="xl" color="green" />
	<div class="flex relative">
		<div
			class="inline-flex relative -top-2 end-3 w-5 h-5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
		>
			<span class="text-xs font-normal text-white m-auto">{notifications.length}</span>
		</div>
	</div>
</div>
<Popover class="max-w-sm border-0" trigger="click" defaultClass="p-0" arrow={false} offset={10}>
	<div slot="title" class="rounded text-center">Notifications</div>
	<div class="bg-50 dark:bg-gray-700">
		{#each notifications as notification}
			<Notification href="#" when={notification.time}>
				New message from <span class="font-semibold text-gray-900 dark:text-white">
					{notification.sender}
				</span>
				: "{notification.message}"
			</Notification>
		{/each}
	</div>
	<Button
		href="/"
		color="none"
		size="lg"
		class="w-full gap-2 rounded-none rounded-b bg-gray-50 py-2.5 text-center text-gray-900 hover:bg-gray-100 dark:mt-0 dark:bg-gray-700 dark:text-white"
	>
		<EyeSolid />
		View all
	</Button>
</Popover>
