<script lang="ts">
	import { Button, Card, Timeline, TimelineItem } from 'flowbite-svelte';
	import { ArrowRightOutline, ClockOutline, EyeOutline } from 'flowbite-svelte-icons';

	export let activities: Array<{
		activity_heading: string;
		activity_description: string;
		activity_type: string;
		customer_name: string;
		customer_segment: string;
		date_time: string;
	}> = [];
</script>

<Card size="xl">
	<div class="mb-4 flex items-center justify-between">
		<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Latest Activities</h3>
		<a
			href="#top"
			class="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
		>
			View all
		</a>
	</div>
	<Timeline>
		{#each activities as activity}
			<TimelineItem
				title="{activity.activity_heading} - {activity.activity_type}"
				date={new Date(activity.date_time).toLocaleString()}
			>
				<div class="flex items-center gap-2">
					{#if activity.activity_type === 'Complaint'}
						<ClockOutline color="red" size="md" />
					{:else if activity.activity_type === 'Request'}
						<ClockOutline size="md" /> 

					{:else}
						<ClockOutline size="md" />
					{/if}
					from <span class="font-medium">{activity.customer_name}</span> ({activity.customer_segment} customer)
				</div>
				<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
					{activity.activity_description}
				</p>
				<Button color="alternative">Learn more<ArrowRightOutline class="ms-2" size="sm" /></Button>
			</TimelineItem>
		{/each}
	</Timeline>
</Card>
