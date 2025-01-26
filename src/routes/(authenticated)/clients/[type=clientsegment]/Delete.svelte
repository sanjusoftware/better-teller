<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	export let open: boolean = false; // modal control
</script>

<Modal title="Dangerous Action" bind:open color="red" size="sm">
	<ExclamationCircleOutline class="mx-auto mb-4 mt-8 h-20 w-20 text-red-600" />

	<h3 class="mb-6 text-center text-lg text-gray-500 dark:text-gray-400">
		Are you sure you want to suspend this client?
	</h3>

	<div class="flex items-center justify-center">
		<Button href="/" color="red" class="mr-2">Yes, I'm sure</Button>
		<Button color="alternative" on:click={() => (open = false)}>No, cancel</Button>
	</div>
</Modal>
