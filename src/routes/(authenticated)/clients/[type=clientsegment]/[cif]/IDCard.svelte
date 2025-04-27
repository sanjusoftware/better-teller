<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { CheckCircleOutline, CloseCircleOutline, RefreshOutline } from 'flowbite-svelte-icons';
	let { IDForntImage, IDBackImage } = $props();

	let showFront = $state(true);

	function toggleCard() {
		showFront = !showFront;
	}
</script>

<div class="flex items-center justify-center">
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
</div>
<div class="flex items-center justify-center mt-4 space-x-2">
	<Button size="xs" pill outline onclick={toggleCard}>
		<RefreshOutline class="mr-2" />Flip card
	</Button>
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
