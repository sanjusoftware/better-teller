<script lang="ts">
    import Transactions from "./Transactions.svelte";

    let dark = false;
</script>

<div class="mt-px space-y-4">
    <Transactions {dark} />
</div>