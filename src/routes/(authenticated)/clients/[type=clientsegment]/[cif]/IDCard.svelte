<script lang="ts">
	import { clientPath } from '$lib/utils/pathHelper';
	import { Button, Modal } from 'flowbite-svelte';
	import { ExpandOutline, RefreshOutline } from 'flowbite-svelte-icons';
	let { IDForntImage, IDBackImage } = $props();

	let showFront = $state(true);
	let enlarge = $state(true);

	function toggleCard() {
		showFront = !showFront;
	}
</script>

<div class="relative w-full mb-2">
	<button onclick={toggleCard} class="w-full text-white">
		<div class="card-inner" class:flipped={!showFront}>
			{#if showFront}
				<div class="card-front">
					<img src={IDForntImage as string} alt="Front of ID card" class="rounded-lg" />
				</div>
			{:else}
				<div class="card-back">
					<img src={IDBackImage as string} alt="Back of ID card" class="rounded-lg" />
				</div>
			{/if}
		</div>
	</button>
	<button
		type="button"
		class="absolute top-2 right-2 p-1 bg-gray-500 bg-opacity-30 hover:bg-opacity-80 rounded-full cursor-pointer"
		onclick={toggleCard}
		aria-label="Flip card"
	>
		<RefreshOutline class="text-white w-4 h-4" />
	</button>
	<button
		type="button"
		class="absolute top-2 right-10 p-1 bg-gray-500 bg-opacity-30 hover:bg-opacity-80 rounded-full cursor-pointer"
		onclick={() => (enlarge = true)}
		aria-label="Enlarge image"
	>
		<ExpandOutline class="text-white w-4 h-4" />
	</button>

	<!-- Modal for enlarged image -->
	<Modal title="ID Card Image" bind:open={enlarge} aria-label="Enlarge ID card" class="overflow-hidden">
		<div class="p-2 flex items-center justify-center relative rounded-lg w-full">
			<div class="card-inner" class:flipped={!showFront}>
				{#if showFront}
					<div class="card-front">
						<img src={IDForntImage as string} alt="Front of ID card" class="rounded-lg" />
					</div>
				{:else}
					<div class="card-back">
						<img src={IDBackImage as string} alt="Back of ID card" class="rounded-lg" />
					</div>
				{/if}
			</div>
		</div>
		<div class="flex justify-center mt-2">
			<Button outline on:click={toggleCard} aria-label="Close modal">
				<RefreshOutline class="mr-2 w-4 h-4" />
				Flip
			</Button>
		</div>
	</Modal>
</div>

<style>
	.card-inner {
		transition: transform 0.6s;
		transform-style: preserve-3d;
		transform: rotateY(0deg);
	}

	.card-back {
		transform: rotateY(180deg);
	}

	.flipped {
		transform: rotateY(180deg);
	}
</style>
