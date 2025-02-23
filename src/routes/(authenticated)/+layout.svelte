<script lang="ts">
  import "../../app.css";
  import MetaTag from "$lib/utils/MetaTag.svelte";
  import Navbar from "$lib/utils/Navbar.svelte";
  import SpeedDial from "$lib/utils/QuickActions.svelte";

  const path: string = "/";
  const description: string = "DSK - Better Teller App";
  const title: string = "DSK - Better Teller App";
  const subtitle: string = "Home";
  


</script>

<div class="antialiased bg-gray-50 dark:bg-gray-900">
  <!-- Top Nav -->
  <Navbar />

  <!-- Main Content -->
  <MetaTag {path} {description} {title} {subtitle} />
  <main class="p-4 h-auto pt-20 relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
    <div class="p-4 bg-gray-50 dark:bg-gray-900">
      <slot />
    </div>
  </main>

  <!-- Quick Actions -->
  <SpeedDial />
</div>
