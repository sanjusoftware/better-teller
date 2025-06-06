<script lang="ts">
	import Change from '$lib/utils/Change.svelte';
	import LastRange from '$lib/utils/LastRange.svelte';
	import { Card, Chart } from 'flowbite-svelte';
	import { ClockSolid } from 'flowbite-svelte-icons';
	import { _ } from 'svelte-i18n';

	const options = {
		series: [
			{
				name: 'Avg. Time',
				type: 'line',
				data: [
					{ x: 'Mon', y: 10 },
					{ x: 'Tue', y: 15 },
					{ x: 'Wed', y: 18 },
					{ x: 'Thu', y: 2 },
					{ x: 'Fri', y: 13 }
				]
			}
		],
		chart: {
			height: '140px',
			toolbar: {
				show: false
			}
		},
		markers: {
			size: 4
		},
		stroke: {
			curve: 'smooth'
		},
		grid: {
			strokeDashArray: 4,
			padding: {
				left: 10,
				right: 10,
				top: -10
			}
		},
		xaxis: {
			type: 'category',
			labels: {
				show: true,
				style: {
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		}
	};

</script>

<Card size="xl">
	<div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
		<div class="flex items-center">
			<div
				class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3"
			>
				<ClockSolid class="w-6 h-6 text-gray-500 dark:text-gray-400" />
			</div>
			<div>
				<h5 class="leading-none text-2xl font-bold text-gray-500 dark:text-white pb-1">
					{$_('dashboard.averageServiceTime')}
				</h5>
				<p class="text-sm font-normal text-gray-500 dark:text-gray-400">{$_('dashboard.inMinutes')}</p>
			</div>
		</div>
		<div>
			<h5 class="text-right text-2xl font-bold text-gray-900 dark:text-white pb-1">10</h5>
			<Change size="sm" value={-18} since="since last month" />
		</div>
	</div>
	<Chart {options} class="border-b border-gray-200 dark:border-gray-700" />
	<LastRange />
</Card>
