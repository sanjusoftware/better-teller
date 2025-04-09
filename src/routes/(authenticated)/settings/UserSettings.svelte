<script lang="ts">
	import { Toggle } from 'flowbite-svelte';
	import Settings from '$lib/utils/SettingsCard.svelte';

	let {
		items = [
			{
				title: String,
				subtitle: String,
				active: Boolean
			}
		]
	} = $props();
</script>

<Settings title="Personal Preferences" subtitle="Set your work preferences" {items} let:item>
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
