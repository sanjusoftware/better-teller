<script lang="ts">
	import Navbar from '$lib/utils/Navbar.svelte';
	import Sidebar from '$lib/utils/Sidebar.svelte';
	import '../../app.css';
	let drawerHidden = false;	
</script>

<header
	class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar {drawerHidden} />	
</header>
<div class="overflow-hidden lg:flex">
	<Sidebar {drawerHidden} />
	<div class="relative h-full w-full overflow-y-auto lg:ml-64">
		<div class="p-2">
			<slot />
		</div>
	</div>
	<!-- Quick Actions -->
	<!-- <SpeedDial /> -->
</div>
