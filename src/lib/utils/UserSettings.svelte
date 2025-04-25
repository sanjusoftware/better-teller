<script lang="ts">
	import { Dropdown, DropdownDivider, Toggle } from 'flowbite-svelte';
	import { CogOutline } from 'flowbite-svelte-icons';
	let isDarkMode = false;
</script>

<div
	id="user-settings"
	class="inline-flex items-center text-sm focus:outline-hidden hover:cursor-pointer"
>
	<CogOutline size="lg" color="green" />
</div>
<Dropdown placement="bottom-end" triggeredBy="#user-settings">
	<li>
		<div class="flex items-center justify-between space-x-10 ml-4">
			<span class="text-sm font-medium text-gray-900 dark:text-white">ENG</span>
			<Toggle size="small" class="rounded-sm p-2" checked />
		</div>
	</li>
	<DropdownDivider />
	<li>
		<div class="flex items-center justify-between space-x-2 ml-4">
			<span class="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</span>
			<Toggle
				size="small"
				class="rounded-sm p-2"
				bind:checked={isDarkMode}
				on:change={() => document.documentElement.classList.toggle('dark', isDarkMode)}
			/>
		</div>
	</li>
	<DropdownDivider />
	<li>
		<div class="flex items-center justify-between space-x-10 ml-4">
			<span class="text-sm font-medium text-gray-900 dark:text-white">ID Scanner</span>
			<Toggle size="small" class="rounded-sm p-2" checked />
		</div>
	</li>
	<DropdownDivider />
	<li>
		<div class="flex items-center justify-between space-x-10 ml-4">
			<span class="text-sm font-medium text-gray-900 dark:text-white">Printer</span>
			<Toggle size="small" class="rounded-sm p-2" checked />
		</div>
	</li>
	<DropdownDivider />
	<li>
		<div class="flex items-center justify-between space-x-10 ml-4">
			<span class="text-sm font-medium text-gray-900 dark:text-white">Cash Drawer</span>
			<Toggle size="small" class="rounded-sm p-2" checked />
		</div>
	</li>
</Dropdown>
