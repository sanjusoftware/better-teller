<script lang="ts">
	import { onMount } from 'svelte';
	import { Badge } from 'flowbite-svelte';
	let time = $state(new Date());
	let hours = $derived(time.getHours());
	let minutes = $derived(time.getMinutes());
	let seconds = $derived(time.getSeconds());
	let ampm = $derived(hours >= 12 ? 'PM' : 'AM');

	type ClockType = 'analog' | 'digital' | 'both';

	let { _24_hrs = false, type = 'both' }: { _24_hrs: boolean; type: ClockType } = $props();

	// Validate the type prop
	if (!['analog', 'digital', 'both'].includes(type)) {
		console.warn(`Invalid type prop value: ${type}. Defaulting to 'analog'.`);
		type = 'analog';
	}

	let size = 40;
	let major_y1 = size - 6;
	let major_y2 = size - 2;
	let minor_y1 = size - 4;
	let minor_y2 = size - 2;

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div style="text-align: center;">
	{#if type === 'digital' || type === 'both'}
		<Badge border>
			{#if _24_hrs}
				{hours} : {minutes} : {seconds}
			{:else}
				{hours <= 12 ? hours : hours - 12} : {minutes} : {seconds} {ampm}
			{/if}
		</Badge>
	{/if}
	{#if type === 'analog' || type === 'both'}
		<svg viewBox="-50 -50 100 100">
			<circle class="clock-face" r={size} />
			<!-- markers -->
			{#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute}
				<line class="major" y1={major_y1} y2={major_y2} transform="rotate({30 * minute})" />

				{#each [1, 2, 3, 4] as offset}
					<line
						class="minor"
						y1={minor_y1}
						y2={minor_y2}
						transform="rotate({6 * (minute + offset)})"
					/>
				{/each}
			{/each}

			<!-- hour hand -->
			<line class="hour" y1="2" y2={-(0.6 * size)} transform="rotate({30 * hours + minutes / 2})" />

			<!-- minute hand -->
			<line
				class="minute"
				y1="4"
				y2={-(0.7 * size)}
				transform="rotate({6 * minutes + seconds / 10})"
			/>

			<!-- second hand -->
			<g transform="rotate({6 * seconds})">
				<line class="second" y1={0.2 * size} y2={-(0.8 * size)} />
				<line class="second-counterweight" y1={0.2 * size} y2="2" />
			</g>
		</svg>
	{/if}
</div>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	.clock-face {
		stroke: #333;
		fill: white;
	}

	.minor {
		stroke: #999;
		stroke-width: 0.5;
	}

	.major {
		stroke: #333;
		stroke-width: 1;
	}

	.hour {
		stroke: #333;
	}

	.minute {
		stroke: #666;
	}

	.second,
	.second-counterweight {
		stroke: rgb(180, 0, 0);
	}

	.second-counterweight {
		stroke-width: 3;
	}
</style>
