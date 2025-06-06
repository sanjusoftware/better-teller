<script lang="ts">
	import { Button, Input, Label } from 'flowbite-svelte';
	import Card from '$lib/utils/InfoCard.svelte';
	import { _ } from 'svelte-i18n';
</script>

<Card title={$_('clients.details.passwordInfoTitle')} class="max-w-none">>
	<div class="grid grid-cols-6 gap-6">
		<Label class="col-span-6 space-y-2 sm:col-span-3">
			<span>{$_('clients.details.currentPasswordLabel')}</span>
			<Input placeholder="••••••••" class="border font-normal outline-none"></Input>
		</Label>
		<Label class="col-span-6 space-y-2 sm:col-span-3">
			<span>{$_('clients.details.newPasswordLabel')}</span>
			<Input placeholder="••••••••" class="border font-normal outline-none"></Input>
		</Label>
		<Label class="col-span-6 space-y-2 sm:col-span-3">
			<span>{$_('clients.details.confirmPasswordLabel')}</span>
			<Input placeholder="••••••••" class="border font-normal outline-none"></Input>
		</Label>
		<Button class="sm:col-full col-span-6 w-fit">{$_('common.save')}</Button> {/* Assuming "Save all" maps to common.save */}
	</div>
</Card>
