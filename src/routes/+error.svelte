<script lang="ts">
    import { Section, Page404 } from 'flowbite-svelte-blocks';
    import { Button } from 'flowbite-svelte';
    import { page } from '$app/state';
  </script>
  
  <Section name="page404">
    <Page404>
      <svelte:fragment slot="h1">404</svelte:fragment>
      <svelte:fragment slot="paragraph">
        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{page.error?.message} - {page.url.pathname}</p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find the page you are looking for.</p>
        <Button href="/dashboard" size="lg" color="red">Back to Homepage</Button>
      </svelte:fragment>
    </Page404>
  </Section>