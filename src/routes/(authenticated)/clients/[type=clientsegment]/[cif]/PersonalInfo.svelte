<script lang="ts">
	import { Button, Input, Label, type InputType } from 'flowbite-svelte';
	import Card from '$lib/utils/InfoCard.svelte';

	export let client: {
		address: string;
		position: string;
		type: string;
		cif: number;
		avatar: string;
		name: string;
		email: string;
		phone: string;
		country: string;
		status: string;
	};

	const inputs: { label: string; type: InputType; placeholder: string; value: string, disabled: boolean }[] = [
		{ label: 'CIF', type: 'text', placeholder: 'e.g. 123456', value: client.cif.toString(), disabled: true },
	{ label: 'Status', type: 'text', placeholder: 'e.g. Active', value: client.status, disabled: true },
		{ label: 'Name', type: 'text', placeholder: 'John Doe', value: client.name, disabled: false },
		{ label: 'Country', type: 'text', placeholder: 'USA', value: client.country, disabled: false },
		{ label: 'Address', type: 'text', placeholder: 'e.g. Bulgaria', value: client.address, disabled: false },
		{ label: 'Email', type: 'text', placeholder: 'email@dskbank.com', value: client.email, disabled: false },
		{ label: 'Phone Number', type: 'text', placeholder: 'e.g. +(12)3456 789', value: client.phone, disabled: false },
		{ label: 'Position', type: 'text', placeholder: 'e.g. CEO', value: client.position, disabled: false },

	];
</script>

<Card title="Personal Information" class="-mt-px max-w-none">
	<form class="grid grid-cols-6 gap-6">
		{#each inputs as { label, type, placeholder, value, disabled }}
			<Label class="col-span-6 space-y-2 sm:col-span-3">
				<span>{label}</span>
				<Input {type} {placeholder} disabled={disabled} class="border font-normal outline-none" bind:value />
			</Label>
		{/each}
		<Button class="w-fit whitespace-nowrap">Save all</Button>
	</form>
</Card>
