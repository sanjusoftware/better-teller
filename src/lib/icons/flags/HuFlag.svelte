<!-- src/lib/icons/flags/HuFlag.svelte -->
<script lang="ts">
  // @ts-ignore - Vite specific import meta syntax for raw SVG
  import svgContent from 'flag-icons/flags/4x3/hu.svg?raw';
  export let className: string = "";
  export let title: string = "Hungarian Flag";
</script>

<span class="flag-icon {className}" {title}>
  {@html svgContent}
</span>

<style>
  /* Shared style with other flag icons */
  .flag-icon :global(svg) {
    width: 1.333em;
    height: 1em;
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
  }
</style>
