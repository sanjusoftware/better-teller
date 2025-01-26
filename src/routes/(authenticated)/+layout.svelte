<script lang="ts">
  import "../../app.css";
  import Navbar from "../utils/Navbar.svelte";
  import SpeedDial from "../utils/QuickActions.svelte";
  import MetaTag from "../utils/MetaTag.svelte";

  const path: string = "/";
  const description: string = "DSK - Better Teller App";
  const title: string = "DSK - Better Teller App";
  const subtitle: string = "Home";
  const loggedIn: boolean = true;
</script>

<div class="antialiased bg-gray-50 dark:bg-gray-900">
  <!-- Top Nav -->
  <Navbar {loggedIn}/>

  <!-- Main Content -->
  <MetaTag {path} {description} {title} {subtitle} />
  <main class="p-4 h-auto pt-20">
    <slot />
  </main>

  <!-- Quick Actions -->
  <SpeedDial />
</div>
