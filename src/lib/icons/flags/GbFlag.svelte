<!-- src/lib/icons/flags/GbFlag.svelte -->
<script lang="ts">
  // @ts-ignore - Vite specific import meta syntax for raw SVG
  import svgContent from 'flag-icons/flags/4x3/gb.svg?raw';
  export let className: string = ""; // Allow passing a class for sizing/styling
  export let title: string = "UK Flag"; // Default title, can be overridden
</script>

<span class="flag-icon {className}" {title}>
  {@html svgContent}
</span>

<style>
  .flag-icon :global(svg) {
    width: 1.333em; /* Default width, assuming 1em height for 4x3 aspect ratio */
    height: 1em;    /* Default height */
    display: inline-block;
    vertical-align: middle;
    /* Ensure SVG scales within the span if width/height are set on the span via className */
    max-width: 100%;
    max-height: 100%;
  }
</style>
