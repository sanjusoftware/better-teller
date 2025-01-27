<script lang="ts">
    import ActivityList from '../(authenticated)/dashboard/ActivityList.svelte';
    import Insights from '../(authenticated)/dashboard/Insights.svelte';

    import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

    let activities = data.Activities;
  </script>

<main class="p-4">
    <div class="mt-px space-y-4">
        <div class="mt-px space-y-4">
            <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <ActivityList {activities}/>
              <Insights />
            </div>
          </div>
    </div>
</main>