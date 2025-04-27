<script lang="ts">
	import Card from '$lib/utils/InfoCard.svelte';
	import { Button, Datepicker, Input, Label, Select } from 'flowbite-svelte';
	import { CameraPhotoOutline, EditOutline } from 'flowbite-svelte-icons';
	let selected = $state<string | undefined>(undefined);
	let countries = [
		{ value: 'idcard', name: 'ID Card' },
		{ value: 'passport', name: 'Passport' },
		{ value: 'dl', name: 'Driving License' }
	];

	let selectedDate = $state(null);
	let editing = $state(false);

	let client = $props();
</script>

<Card>	
	<form>
		<div class="flex justify-between items-center mb-4">
			<Button pill outline onclick={() => { alert("To implement") }}>
				<CameraPhotoOutline size="md" class="mr-2" />Scan Again
			</Button>
			{#if !editing}
				<button
					type="button"
					aria-label="Toggle editing"
					onclick={() => {
						editing = !editing;
					}}
					class="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 dark:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<EditOutline size="sm" /> Edit
				</button>
			{/if}
		</div>
		<div class="mb-4">
			<Label for="document_type" class="mb-2">Document Type</Label>
			<Select
				id="document_type"
				bind:value={selected}
				placeholder="Please select type of ID document"
			>
				{#each countries as { value, name }}
					<option {value}>{name}</option>
				{/each}
			</Select>
		</div>
		<div class="grid gap-6 md:grid-cols-2 mb-4">
			<div>
				<Label for="document_number" class="mb-2">Docuemnt Number</Label>
				<Input
					type="text"
					id="document_number"
					placeholder="123456789"
					required
					disabled={!editing}
				/>
			</div>
			<div>
				<Label for="issuing_authority" class="mb-2">Issuring Authority</Label>
				<Input type="text" id="issuing_authority" placeholder="MoI BGR" />
			</div>
			<div>
				<Label for="issue_date" class="mb-2">Date of issue</Label>
				<Datepicker bind:value={selectedDate} color="primary" required />
			</div>
			<div>
				<Label for="issue_date" class="mb-2">Date of expiry</Label>
				<Datepicker bind:value={selectedDate} color="primary" required />
			</div>
			<div>
				<Label for="birth_date" class="mb-2">Date of birth</Label>
				<Datepicker bind:value={selectedDate} color="primary" required />
			</div>
			<div>
				<Label for="birth_place" class="mb-2">Place of birth</Label>
				<Input type="text" id="birth_place" placeholder="Sofia" />
			</div>
		</div>
		<div class="mb-6">
			<Label for="email" class="mb-2">Email address</Label>
			<Input type="email" id="email" placeholder="john.doe@company.com" required />
		</div>
		<div class="grid gap-6 md:grid-cols-2 mb-4">
			<div>
				<Label for="phone" class="mb-2">Phone number</Label>
				<Input
					type="tel"
					id="phone"
					placeholder="123-45-678"
					pattern={'[0-9]{3}-[0-9]{2}-[0-9]{3}'}
					required
				/>
			</div>
			<div>
				<Label for="email" class="mb-2">Email address</Label>
				<Input type="email" id="email" placeholder="john.doe@company.com" required />
			</div>
		</div>
		<div class="flex justify-end">
			<Button pill type="submit">Next</Button>
		</div>
	</form>
</Card>
