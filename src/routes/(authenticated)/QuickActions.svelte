<script>
    import {
    ShareNodesSolid,
    PrinterSolid,
    DownloadSolid,
    FileCopySolid,
  } from "flowbite-svelte-icons";
  import {
    SpeedDial,
    SpeedDialButton,
  } from "flowbite-svelte";
</script>

<!-- Quick Actions -->
  <SpeedDial defaultClass="fixed end-6 bottom-6" tooltip="none">
    <SpeedDialButton name="Share">
      <ShareNodesSolid class="w-6 h-6" />
    </SpeedDialButton>
    <SpeedDialButton name="Print">
      <PrinterSolid class="w-6 h-6" />
    </SpeedDialButton>
    <SpeedDialButton name="Save">
      <DownloadSolid class="w-6 h-6" />
    </SpeedDialButton>
    <SpeedDialButton name="Copy">
      <FileCopySolid class="w-6 h-6" />
    </SpeedDialButton>
  </SpeedDial>