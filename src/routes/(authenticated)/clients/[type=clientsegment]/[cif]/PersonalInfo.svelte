<script lang="ts">
	import Card from '$lib/utils/InfoCard.svelte';
	import { Button, Datepicker, Input, Label, Select } from 'flowbite-svelte';
	import { CameraPhotoOutline, EditOutline } from 'flowbite-svelte-icons';
	import { _ } from 'svelte-i18n';

	let selected = $state<string | undefined>(undefined);
	// `countries` items' names also need localization if they are displayed.
	// For now, assuming they are just values and placeholder is key.
	let countries = [
		{ value: 'idcard', name: 'ID Card' }, // Potentially $_('clients.details.personalInfo.idCardOption')
		{ value: 'passport', name: 'Passport' }, // Potentially $_('clients.details.personalInfo.passportOption')
		{ value: 'dl', name: 'Driving License' } // Potentially $_('clients.details.personalInfo.drivingLicenseOption')
	];

	let selectedDate = $state(null);
	let editing = $state(false);

	let client = $props();
</script>

<Card>	
	<form>
		<div class="flex justify-between items-center mb-4">
			<Button pill outline onclick={() => { alert("To implement") }}>
				<CameraPhotoOutline size="md" class="mr-2" />{$_('clients.details.personalInfo.scanAgainButton')}
			</Button>
			{#if !editing}
				<button
					type="button"
					aria-label={$_('common.edit')}
					onclick={() => {
						editing = !editing;
					}}
					class="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 dark:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<EditOutline size="sm" /> {$_('common.edit')}
				</button>
			{/if}
		</div>
		<div class="mb-4">
			<Label for="document_type" class="mb-2">{$_('clients.details.personalInfo.documentTypeLabel')}</Label>
			<Select
				id="document_type"
				bind:value={selected}
				placeholder={$_('clients.details.personalInfo.documentTypePlaceholder')}
			>
				{#each countries as { value, name }}
					<option {value}>{name}</option> {/* Name here would need localization if it's not just for value mapping */}
				{/each}
			</Select>
		</div>
		<div class="grid gap-6 md:grid-cols-2 mb-4">
			<div>
				<Label for="document_number" class="mb-2">{$_('clients.details.personalInfo.documentNumberLabel')}</Label>
				<Input
					type="text"
					id="document_number"
					placeholder="123456789"
					required
					disabled={!editing}
				/>
			</div>
			<div>
				<Label for="issuing_authority" class="mb-2">{$_('clients.details.personalInfo.issuingAuthorityLabel')}</Label>
				<Input type="text" id="issuing_authority" placeholder="MoI BGR" />
			</div>
			<div>
				<Label for="issue_date" class="mb-2">{$_('clients.details.personalInfo.dateOfIssueLabel')}</Label>
				<Datepicker bind:value={selectedDate} color="primary" required />
			</div>
			<div>
				<Label for="expiry_date" class="mb-2">{$_('clients.details.personalInfo.dateOfExpiryLabel')}</Label> {/* Corrected key */}
				<Datepicker bind:value={selectedDate} color="primary" required />
			</div>
			<div>
				<Label for="birth_date" class="mb-2">{$_('clients.details.personalInfo.dateOfBirthLabel')}</Label>
				<Datepicker bind:value={selectedDate} color="primary" required />
			</div>
			<div>
				<Label for="birth_place" class="mb-2">{$_('clients.details.personalInfo.placeOfBirthLabel')}</Label>
				<Input type="text" id="birth_place" placeholder="Sofia" />
			</div>
		</div>
		<div class="mb-6"> {/* This email field seems redundant if there's one below, or it's for a different purpose */}
			<Label for="email_main" class="mb-2">{$_('clients.details.personalInfo.emailAddressLabel')}</Label>
			<Input type="email" id="email_main" placeholder="john.doe@company.com" required />
		</div>
		<div class="grid gap-6 md:grid-cols-2 mb-4">
			<div>
				<Label for="phone" class="mb-2">{$_('clients.details.personalInfo.phoneNumberLabel')}</Label>
				<Input
					type="tel"
					id="phone"
					placeholder="123-45-678"
					pattern={'[0-9]{3}-[0-9]{2}-[0-9]{3}'}
					required
				/>
			</div>
			<div>
				<Label for="email_contact" class="mb-2">{$_('clients.details.personalInfo.emailAddressLabel')}</Label> {/* Ensure unique ID if this is a different email field */}
				<Input type="email" id="email_contact" placeholder="john.doe@company.com" required />
			</div>
		</div>
		<div class="flex justify-end">
			<Button pill type="submit">{$_('common.next')}</Button>
		</div>
	</form>
</Card>
