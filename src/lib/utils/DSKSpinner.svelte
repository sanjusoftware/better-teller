<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { Circle } from 'svelte-loading-spinners';

	let { title = 'Processing... Please wait!', open = $bindable(false) } = $props();
</script>

<Modal
	{title}
	classHeader="text-gray-900 flex justify-center items-center p-4 md:p-5 rounded-t-lg"
	class="h-full"
	{open}
	size="sm"
	autoclose={false}
	dismissable={false}
>
	<div class="flex justify-center items-center m-10">
		<Circle size="120" color="#37c92c" unit="px" duration="1s" />
	</div>
</Modal>
