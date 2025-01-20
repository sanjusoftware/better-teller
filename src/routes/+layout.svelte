<script lang="ts">
  import "../app.css";
  import Navbar from "./Navbar.svelte";
  import SpeedDial from "./QuickActions.svelte";
  import SideBar from "./SideBar.svelte";
  import MetaTag from './utils/MetaTag.svelte';

  const path: string = 'Home';
  const description: string = 'DSK - Better Teller App';
  const title: string = 'DSK - Better Teller App';
  const subtitle: string = 'Home';
</script>

<div class="antialiased bg-gray-50 dark:bg-gray-900">
  <!-- Top Nav -->
   <Navbar />

  <!-- Sidebar -->
   <SideBar />

  <!-- Main Content -->
  <MetaTag {path} {description} {title} {subtitle} />
  <main class="p-4 md:ml-64 h-auto pt-20">
    <slot />
  </main>
  
  <!-- Quick Actions -->
   <SpeedDial />
</div>
