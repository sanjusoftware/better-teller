<script>
	import { Button, Popover, ToolbarButton } from 'flowbite-svelte';
	import {
		BellSolid,
		EyeSolid
	} from 'flowbite-svelte-icons';
	import Notification from './Notification.svelte';
</script>

<ToolbarButton size="lg" class="-mx-0.5 hover:text-gray-900 dark:hover:text-white">
	<BellSolid size="lg" />
</ToolbarButton>
<Popover class="max-w-sm border-0" trigger="click" defaultClass="p-0" arrow={false} offset={10}>
	<div slot="title" class="rounded text-center">Notifications</div>
	<div class="bg-50 dark:bg-gray-700">
		<Notification
			href="#"
			when="a few moments ago"
		>
			New message from <span class="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
			: "Hey, what's up? All set for the presentation?"
		</Notification>
		<Notification
			href="#"
			when="10 minutes ago"
		>
			<span class="font-semibold text-gray-900 dark:text-white">Jese leos</span> and
			<span class="font-medium text-gray-900 dark:text-white">5 others</span> started following you.
		</Notification>

		<Notification
			href="#"
			when="44 minutes ago"
		>
			<span class="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and
			<span class="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See
			it and view more stories.
		</Notification>

		<Notification
			href="#"
			when="1 hour ago"
		>
			<span class="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span>
			mentioned you in a comment:
			<span class="font-medium text-primary-700 dark:text-primary-500">@bonnie.green</span> what do you
			say?
		</Notification>

		<Notification
			href="#"
			when="3 hours ago"
		>
			<span class="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted a new video:
			Glassmorphism - learn how to implement the new design trend.
		</Notification>
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
