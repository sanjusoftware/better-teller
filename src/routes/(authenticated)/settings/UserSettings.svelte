<script lang="ts">
	import { Toggle } from 'flowbite-svelte';
	import Settings from '$lib/utils/SettingsCard.svelte';

	const items = [
		{
			title: 'New Products and Offers',
			subtitle: 'Get new product announcements, discounts and updates',
			active: false
		},
		{
			title: 'Account Activity',
			subtitle: "Get important notifications about you or account activities",
			active: true
		},
		{
			title: 'Payment Reminders',
			subtitle: 'Get reminders about utlity payments, credit card payments, and mortage payments',
			active: false
		},
		{
			title: 'Security Notifications',
			subtitle: 'Get notified when you need to enter a one-time password',
			active: true
		}
	];
</script>

<Settings
	title="Alerts & Notifications"
	subtitle="Set up phone alerts and notifications"
	{items}
	let:item
>
	<div class="flex items-center justify-between">
		<div class="flex flex-grow flex-col">
			<div class="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</div>
			<div class="text-base font-normal text-gray-500 dark:text-gray-400">
				{item.subtitle}
			</div>
		</div>
		<Toggle checked={item.active} class="peer-focus:ring-0 me-0" />
	</div>
</Settings>
