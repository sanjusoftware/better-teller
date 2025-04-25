<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import {
		CameraPhotoOutline,
		CheckCircleOutline,
		CloseCircleOutline,
		RefreshOutline
	} from 'flowbite-svelte-icons';
	let { IDForntImage, IDBackImage } = $props();

	let showFront = $state(true);

	function toggleCard() {
		showFront = !showFront;
	}
</script>

<Card class="p-5" size="xl">
	<div class="w-full mb-4 border-b">
		<div class="flex justify-between mb-2 text-sm">
			<div class="flex items-center">
				<CheckCircleOutline class="mr-1" size="lg" color="green" />
				MRZ-OCR
			</div>
			<div class="flex items-center">
				<CheckCircleOutline class="mr-1" size="lg" color="green" />
				UV Elements
			</div>
			<div class="flex items-center">
				<CloseCircleOutline class="mr-1" size="lg" color="red" />
				Validated at Ministry of Interior
			</div>
		</div>
	</div>
	<div class="flex items-center justify-center">
		<button onclick={toggleCard} class="w-full text-white">
			<div class="card-inner" class:flipped={!showFront}>
				{#if showFront}
					<div class="card-front">
						<img src={IDForntImage as string} alt="Front of ID card" />
					</div>
				{:else}
					<div class="card-back">
						<img src={IDBackImage} alt="Back of ID card" />
					</div>
				{/if}
			</div>
		</button>
	</div>
	<div class="flex items-center justify-center mt-4 space-x-2">
		<Button pill outline onclick={toggleCard}>
			<RefreshOutline size="md" class="mr-2" />Flip card
		</Button>
		<Button pill outline onclick={()=> {alert("To implement")}}>
			<CameraPhotoOutline size="md" class="mr-2" />Scan Again
		</Button>
	</div>
</Card>

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
