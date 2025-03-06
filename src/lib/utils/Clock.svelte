<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	
	let time = $state(new Date());
	let hours = $derived(time.getHours());
	let minutes = $derived(time.getMinutes());
	let seconds = $derived(time.getSeconds());
	let ampm = $derived(hours >= 12 ? 'PM' : 'AM');

	type ClockType = 'analog' | 'digital' | 'both';

	let { _24_hrs = false, type = 'both' }: { _24_hrs?: boolean; type?: ClockType } = $props();

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
		<svg viewBox="-50 -50 100 100" style="width: 100%; height: 100%;">
			<circle r={size} style="stroke: #333; fill: white;" />
			<!-- markers -->
			{#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute}
				<line y1={major_y1} y2={major_y2} transform="rotate({30 * minute})" style="stroke: #333; stroke-width: 1;" />

				{#each [1, 2, 3, 4] as offset}
					<line
						y1={minor_y1}
						y2={minor_y2}
						transform="rotate({6 * (minute + offset)})"
						style="stroke: #999; stroke-width: 0.5;"
					/>
				{/each}
			{/each}

			<!-- hour hand -->
			<line y1="2" y2={-(0.6 * size)} transform="rotate({30 * hours + minutes / 2})" style="stroke: #333;" />

			<!-- minute hand -->
			<line
				y1="4"
				y2={-(0.7 * size)}
				transform="rotate({6 * minutes + seconds / 10})"
				style="stroke: #666;"
			/>

			<!-- second hand -->
			<g transform="rotate({6 * seconds})">
				<line y1={0.2 * size} y2={-(0.8 * size)} style="stroke: rgb(180, 0, 0);" />
				<line y1={0.2 * size} y2="2" style="stroke: rgb(180, 0, 0); stroke-width: 3;" />
			</g>
		</svg>
	{/if}
</div>
