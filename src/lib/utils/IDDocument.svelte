<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import { RefreshOutline } from 'flowbite-svelte-icons';
	import SpeedDialActions from './SpeedDialActions.svelte';
	let { IDForntImage, IDBackImage} = $props();

	let showFront = $state(true);

	function toggleCard() {
		showFront = !showFront;
	}
</script>

<Card class="p-5" size="xl">
	<div class="flex items-center justify-center">
		<button onclick={toggleCard} class="w-full text-white">
			<div class="card-inner" class:flipped={!showFront}>
				{#if showFront}
				<div class="card-front">
					<img  src={IDForntImage as string} alt="Front of ID card" />
				</div>
				{:else}
				<div class="card-back">
					<img src={IDBackImage} alt="Back of ID card" />
				</div>
				{/if}
			</div>
		</button>
	</div>
</Card>
<div class="flex items-center justify-center">
	<Button
		pill
		outline
		onclick={toggleCard}
	>
		<RefreshOutline size="md" class="mr-2" />Flip card
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
