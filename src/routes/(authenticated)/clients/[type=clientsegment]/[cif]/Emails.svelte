<script lang="ts">
	import { Toggle } from 'flowbite-svelte';
	import EmailPreferences from '$lib/utils/SettingsCard.svelte';

	const items = [
		{
			title: 'DSK Newsletters',
			subtitle: 'Get DSK news, announcements, and product updates',
			active: true
		},
		{
			title: 'Account Statements',
			subtitle: 'Get monthly account statements and updates',
			active: false
		},
		{
			title: 'Promotions',
			subtitle: 'Get notified about promotions and special offers',
			active: false
		},
		{
			title: 'Product Updates',
			subtitle: 'Get notified about new products and features',
			active: true
		}
	];
</script>

<EmailPreferences
	title="Email Preferences"
	subtitle="Set Email preferences"
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
</EmailPreferences>
