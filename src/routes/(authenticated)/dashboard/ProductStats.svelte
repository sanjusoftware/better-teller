<script lang="ts">
	import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { UsersGroupOutline, ArrowUpOutline, ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
  
	const options = {
	  series: [
		{
		  name: 'In Person',
		  color: '#16a34a',
		  data: [
			{ x: 'Mon', y: 10 },
			{ x: 'Tue', y: 22 },
			{ x: 'Wed', y: 43 },
			{ x: 'Thu', y: 21 },
			{ x: 'Fri', y: 22 },
			{ x: 'Sat', y: 15 },
			{ x: 'Sun', y: 11 }
		  ]
		}
	  ],
	  chart: {
		type: 'bar',
		height: '250px',
		fontFamily: 'Inter, sans-serif',
		toolbar: {
		  show: false
		}
	  },
	  plotOptions: {
		bar: {
		  horizontal: false,
		  columnWidth: '70%',
		  borderRadiusApplication: 'end',
		  borderRadius: 8
		}
	  },
	  tooltip: {
		shared: true,
		intersect: false,
		style: {
		  fontFamily: 'Inter, sans-serif'
		}
	  },
	  states: {
		hover: {
		  filter: {
			type: 'darken',
			value: 1
		  }
		}
	  },
	  stroke: {
		show: true,
		width: 0,
		colors: ['transparent']
	  },
	  grid: {
		show: false,
		strokeDashArray: 4,
		padding: {
		  left: 2,
		  right: 2,
		  top: -14
		}
	  },
	  dataLabels: {
		enabled: false
	  },
	  legend: {
		show: false
	  },
	  xaxis: {
		floating: false,
		labels: {
		  show: true,
		  style: {
			fontFamily: 'Inter, sans-serif',
			cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
		  }
		},
		axisBorder: {
		  show: false
		},
		axisTicks: {
		  show: false
		}
	  },
	  yaxis: {
		show: false
	  },
	  fill: {
		opacity: 1
	  }
	};
  </script>
  
  <Card>
	<div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
	  <div class="flex items-center">
		<div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
		  <UsersGroupOutline class="w-6 h-6 text-gray-500 dark:text-gray-400" />
		</div>
		<div>
		  <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">314</h5>
		  <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Clients served</p>
		</div>
	  </div>
	  <div>
		<span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
		  <ArrowUpOutline class="w-2.5 h-2.5 me-1.5" />
		  42.5%
		</span>
	  </div>
	</div>
	<Chart {options} />
	<div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
	  <div class="flex justify-between items-center pt-5">
		<Button class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0">Last 7 days<ChevronDownOutline class="w-2.5 m-2.5 ms-1.5" /></Button>
		<Dropdown class="w-40" offset="-6">
		  <DropdownItem>Yesterday</DropdownItem>
		  <DropdownItem>Today</DropdownItem>
		  <DropdownItem>Last 7 days</DropdownItem>
		  <DropdownItem>Last 30 days</DropdownItem>
		  <DropdownItem>Last 90 days</DropdownItem>
		</Dropdown>
	  </div>
	</div>
  </Card>