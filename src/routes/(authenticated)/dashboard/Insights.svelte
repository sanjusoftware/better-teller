<script lang="ts">
	import { Button, Card, Carousel } from 'flowbite-svelte';
	import {
		ArrowLeftOutline,
		ArrowRightOutline,
		CheckOutline,
		LayersSolid,
		RocketSolid
	} from 'flowbite-svelte-icons';
	import { fade, fly } from 'svelte/transition';
	const items = [{}, {}];
	let animation = (node: Element) => fade(node, { duration: 200 });

	let transitionSlideIn = {
		x: '100%',
		opacity: 0.5,
		duration: 500
	};

	let transitionSlideOut = {
		x: '-100%',
		opacity: 0.5,
		duration: 500
	};
</script>

<Card size="xl">
	<Carousel images={items} let:Controls class="flex h-full">
		<div slot="slide" let:index>
			{#if index == 0}
				<div in:fly={transitionSlideIn} out:fly={transitionSlideOut} class="h-full">
					<div class="mb-4 flex items-center gap-2 text-lg font-medium text-primary-600">
						<LayersSolid />
						<span>Insights</span>
					</div>
					<h3 class="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
						Your customer's avergage waiting time is 15 mins. Try to get it under the threshold of
						10 mins.
					</h3>
					<p class="mb-4 text-gray-500 dark:text-gray-400">
						Take the Customer Service Efficiency training course provided by DSK free of charge. Ask
						for assistance from the branch manager is necessary.
					</p>
					<p class="mb-2 text-lg font-medium text-gray-900 dark:text-white">Actions to take:</p>
					<ul class="mb-4 list-disc space-y-3 pl-4 text-gray-500 dark:text-gray-400">
						<li>Take the Customer Service Efficiency training course.</li>
						<li>Monitor your performance mertrics in one month after taking the course once again.</li>
					</ul>
				</div>
			{:else if index == 1}
				<div in:fly={transitionSlideIn} out:fly={transitionSlideOut} class="h-full">
					<div class="mb-4 flex items-center text-lg font-medium text-teal-500">
						<RocketSolid class="me-2" /> Business growth opportunities
					</div>
					<p class="mb-4 text-gray-500 dark:text-gray-400">
						Marketing, sales &amp; business growth for small business is increasing in the past 4 months. Improve your marketing &amp;
						promotion results - and grow your sales!
						DSK customers opened 10% more term deposits accounts last month alone.
					</p>
					<p class="mb-4 text-lg font-medium text-gray-900 dark:text-white">What can you do:</p>
					<ul role="list" class="mb-4 list-disc space-y-3 pl-2 text-gray-500 dark:text-gray-400">
						<li class="flex space-x-2">
							<CheckOutline size="lg" />
							<span class="leading-tight">
								Learn from competitors about what to do, and not to do
							</span>
						</li>
						<li class="flex space-x-2">
							<CheckOutline size="lg" />
							<span class="leading-tight">Take their business to the next level</span>
						</li>
						<li class="flex space-x-2">
							<CheckOutline size="lg" />
							<span class="leading-tight">Limitless business automation</span>
						</li>
						<li class="flex space-x-2">
							<CheckOutline size="lg" />
							<span class="leading-tight">
								Build relationships with other businesses to co-promote
							</span>
						</li>
					</ul>
				</div>
			{/if}
		</div>
		<Controls let:changeSlide>
			<div class="mt-10 flex items-center justify-center gap-5">
				<button on:click={() => changeSlide(false)}><ArrowLeftOutline size="lg" /></button>
				<button on:click={() => changeSlide(true)}><ArrowRightOutline size="lg" /></button>
			</div>
		</Controls>
	</Carousel>
</Card>
