<script lang="ts">
	import { page } from '$app/state';
	import Card from '$lib/utils/InfoCard.svelte';
	import {
		Badge,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Heading,
		Helper,
		Input,
		Label,
		Modal,
		Select,
		StepIndicator,
		Toggle
	} from 'flowbite-svelte';
	import SuperDebug, { dateProxy, superForm } from 'sveltekit-superforms';

	let clientNumber = $state(null);
	let stepNames = ['ID Information', 'Contact Data', 'GDPR, KYC Documents'];
	let currentStep = $state(1);

	import { countries, genders, locations, quaters } from '$lib/utils/constants';
	import IDCard from '$lib/utils/IDCard.svelte';
	import DskSpinner from '$lib/utils/DSKSpinner.svelte';
	import PhoneVerification from '../[type=clientsegment]/[cif]/PhoneVerification.svelte';

	const { form, errors, constraints, enhance, capture, restore, delayed } = superForm(
		page.data.newClientForm,
		{
			dataType: 'json',
			delayMs: 100,
			async onResult({ result }) {
				if (result.type === 'success') {
					clientNumber = result.data?.clientNumber;
					currentStep = 2;
				}
			}
		}
	);

	const {
		form: contactForm,
		errors: contactErrors,
		constraints: contactConstraints,
		enhance: contactEnhance
	} = superForm(page.data.contactForm, {
		dataType: 'json',
		delayMs: 100,
		async onResult({ result }) {
			if (result.type === 'success') {
				clientNumber = result.data?.clientNumber;
				currentStep = 3;
			}
		}
	});

	let phoneVerficationModal = $state(false);

	const issueDateProxy = dateProxy(form, 'id_issue_date', { format: 'date' });
	const expiryDateProxy = dateProxy(form, 'id_expiry_date', { format: 'date' });
	const dobProxy = dateProxy(form, 'date_of_birth', { format: 'date' });
	export const snapshot = { capture, restore };
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Clients</BreadcrumbItem>
	<BreadcrumbItem>New Client</BreadcrumbItem>
	{#if clientNumber}
		<BreadcrumbItem>
			<a href="?/viewClient?clientNumber={clientNumber}">{clientNumber}</a>
		</BreadcrumbItem>
	{/if}
</Breadcrumb>

<StepIndicator {currentStep} steps={stepNames} />

<Card class="-mt-px max-w-none mt-5">
	{#if stepNames[currentStep - 1] === 'ID Information'}
		<form action="?/createNewClient" method="POST" use:enhance>
			<div class="grid grid-cols-2 gap-4 mb-6">
				<Card>
					<IDCard IDForntImage={$form.id_front_image} IDBackImage={$form.id_back_image} />
				</Card>
				<Card class="flex flex-col items-center justify-center h-full py-8">
					<Badge rounded border color="red" class="p-5 text-lg font-medium mb-5">
						No existing client found with the ID card.
					</Badge>
					<h1 class="font-bold text-2xl mb-5 text-gray-900">Do you want to create new client?</h1>
					<div class="flex gap-4">
						<Button pill outline color="red" class="px-10">No</Button>
						<Button pill color="green" class="px-10" type="submit">Yes</Button>
					</div>
				</Card>
			</div>
			<div class="grid grid-cols-2 gap-4 mb-2">
				<div>
					<Label for="document_type" class="mb-2">Document type</Label>
					<Input
						bind:value={$form.document_type}
						aria-invalid={$errors.document_type ? 'true' : undefined}
						{...$constraints.document_type}
						type="text"
						id="document_type"
						required
						color={$errors.document_type ? 'red' : undefined}
						disabled
					/>
					{#if $errors.document_type}
						<Helper class="mt-2" color="red">
							{$errors.document_type}
						</Helper>
					{/if}
				</div>
				<div class="flex justify-end items-end h-full">
					<Button pill outline class="px-6" type="button">Scan Again</Button>
				</div>
			</div>
			<div class="grid grid-cols-4 gap-4">
				<div>
					<Label for="document_number" class="mb-2">Document number</Label>
					<Input
						bind:value={$form.document_number}
						aria-invalid={$errors.document_number ? 'true' : undefined}
						{...$constraints.document_number}
						type="text"
						id="document_number"
						placeholder="Document Number"
						required
						color={$errors.document_number ? 'red' : undefined}
					/>
					{#if $errors.document_number}
						<Helper class="mt-2" color="red">
							{$errors.document_number}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="issuing_authority" class="mb-2">Issued by</Label>
					<Input
						bind:value={$form.issuing_authority}
						aria-invalid={$errors.issuing_authority ? 'true' : undefined}
						{...$constraints.issuing_authority}
						type="text"
						id="issuing_authority"
						placeholder="MoI BGR"
						required
						color={$errors.issuing_authority ? 'red' : undefined}
					/>
					{#if $errors.issuing_authority}
						<Helper class="mt-2" color="red">
							{$errors.issuing_authority}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="names_cyrilic" class="mb-2">Names in cyrilic</Label>
					<Input
						bind:value={$form.names_cyrilic}
						aria-invalid={$errors.names_cyrilic ? 'true' : undefined}
						{...$constraints.names_cyrilic}
						type="text"
						id="names_cyrilic"
						placeholder="Names in Cyrilic"
						required
						color={$errors.names_cyrilic ? 'red' : undefined}
					/>
					{#if $errors.names_cyrilic}
						<Helper class="mt-2" color="red">
							{$errors.names_cyrilic}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="names_latin" class="mb-2">Names in latin</Label>
					<Input
						bind:value={$form.names_latin}
						aria-invalid={$errors.names_latin ? 'true' : undefined}
						{...$constraints.names_latin}
						type="text"
						id="full_name"
						placeholder="Jon Doe"
						required
						color={$errors.names_latin ? 'red' : undefined}
					/>
					{#if $errors.names_latin}
						<Helper class="mt-2" color="red">
							{$errors.names_latin}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="id_issue_date" class="mb-2">ID issue date</Label>
					<input
						name="id_issue_date"
						type="date"
						bind:value={$issueDateProxy}
						class="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-primary-500"
						aria-invalid={$errors.id_issue_date ? 'true' : undefined}
						{...$constraints.id_issue_date}
					/>
					{#if $errors.id_issue_date}
						<Helper class="mt-2" color="red">
							{$errors.id_issue_date}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="id_expiry_date" class="mb-2">ID expiry date</Label>
					<input
						name="id_expiry_date"
						type="date"
						bind:value={$expiryDateProxy}
						class="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-primary-500"
						aria-invalid={$errors.id_expiry_date ? 'true' : undefined}
						{...$constraints.id_expiry_date}
					/>
					{#if $errors.id_expiry_date}
						<Helper class="mt-2" color="red">
							{$errors.id_expiry_date}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="egn" class="mb-2">EGN/Personal ID</Label>
					<Input
						bind:value={$form.egn}
						aria-invalid={$errors.egn ? 'true' : undefined}
						{...$constraints.egn}
						type="text"
						id="ucn"
						placeholder="9876543210"
						required
						color={$errors.egn ? 'red' : undefined}
						disabled
					/>
					{#if $errors.egn}
						<Helper class="mt-2" color="red">
							{$errors.egn}
						</Helper>
					{/if}
				</div>
				<div>
					<Label class="mb-2">Country of issuance</Label>
					<Select
						id="issuing_country"
						class="mt-2"
						bind:value={$form.issuing_country}
						placeholder=""
					>
						{#each countries as { value, label }}
							<option {value}>{label}</option>
						{/each}
					</Select>
					{#if $errors.issuing_country}
						<Helper class="mt-2" color="red">
							{$errors.issuing_country}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="date_of_birth" class="mb-2">Date of birth</Label>
					<input
						name="date_of_birth"
						type="date"
						bind:value={$dobProxy}
						class="w-full border-gray-300 rounded-lg focus:ring-green-500 focus:border-primary-500"
						aria-invalid={$errors.date_of_birth ? 'true' : undefined}
						{...$constraints.date_of_birth}
					/>
					{#if $errors.date_of_birth}
						<Helper class="mt-2" color="red">
							{$errors.date_of_birth}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="place_of_birth" class="mb-2">Place of birth</Label>
					<Input
						bind:value={$form.place_of_birth}
						aria-invalid={$errors.place_of_birth ? 'true' : undefined}
						{...$constraints.place_of_birth}
						type="text"
						id="place_of_birth"
						placeholder="Place of birth"
						color={$errors.place_of_birth ? 'red' : undefined}
					/>
					{#if $errors.place_of_birth}
						<Helper class="mt-2" color="red">
							{$errors.place_of_birth}
						</Helper>
					{/if}
				</div>
				<div>
					<Label class="mb-2">Citizenship</Label>
					<Select id="citizenship" class="mt-2" bind:value={$form.citizenship} placeholder="">
						{#each countries as { value, label }}
							<option {value}>{label}</option>
						{/each}
					</Select>
					{#if $errors.citizenship}
						<Helper class="mt-2" color="red">
							{$errors.citizenship}
						</Helper>
					{/if}
				</div>
				<div>
					<Label class="mb-2">Gender</Label>
					<Select id="gender" class="mt-2" bind:value={$form.gender} placeholder="">
						{#each genders as { value, label }}
							<option {value}>{label}</option>
						{/each}
					</Select>
					{#if $errors.gender}
						<Helper class="mt-2" color="red">
							{$errors.gender}
						</Helper>
					{/if}
				</div>
				<div class="col-span-2">
					<Label for="permanent_address" class="mb-2">Permanent address</Label>
					<Input
						bind:value={$form.permanent_address}
						aria-invalid={$errors.permanent_address ? 'true' : undefined}
						{...$constraints.permanent_address}
						type="text"
						id="permanent_address"
						placeholder="Permanent address"
						required
						color={$errors.permanent_address ? 'red' : undefined}
					/>
					{#if $errors.permanent_address}
						<Helper class="mt-2" color="red">
							{$errors.permanent_address}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="postal_code" class="mb-2">Postal code</Label>
					<Input
						bind:value={$form.post_code}
						aria-invalid={$errors.post_code ? 'true' : undefined}
						{...$constraints.post_code}
						type="text"
						id="post_code"
						placeholder="Enter postal code"
						required
						color={$errors.post_code ? 'red' : undefined}
					/>
					{#if $errors.post_code}
						<Helper class="mt-2" color="red">
							{$errors.post_code}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="residence" class="mb-2">Residence</Label>
					<Input
						bind:value={$form.residence}
						aria-invalid={$errors.residence ? 'true' : undefined}
						{...$constraints.residence}
						type="text"
						id="residence"
						placeholder="Enter country of residence"
						required
						color={$errors.residence ? 'red' : undefined}
						disabled
					/>
					{#if $errors.residence}
						<Helper class="mt-2" color="red">
							{$errors.residence}
						</Helper>
					{/if}
				</div>
				<div class="col-span-4">
					<Label class="mb-2 flex items-center gap-2">
						Correspondence Address is samke as permanent address?
						<Toggle size="small" bind:checked={$form.matches_mailing_address as boolean}>
							{#snippet offLabel()}
								No
							{/snippet}
							Yes
						</Toggle>
					</Label>
				</div>
			</div>
			<div class="grid grid-cols-4 gap-4 mt-2" class:hidden={$form.matches_mailing_address}>
				<div class="col-span-4">
					<Heading tag="h5">Correspondence Address:</Heading>
				</div>
				<div>
					<Label for="mailing_location" class="mb-2">Location (city/village)</Label>
					<Select
						id="mailing_location"
						class="mt-2"
						bind:value={$form.mailing_address.location}
						placeholder="Choose location"
					>
						{#each locations as { value, label }}
							<option {value}>{label}</option>
						{/each}
					</Select>
				</div>
				<div>
					<Label for="mailing_quater" class="mb-2">Quarter</Label>
					<Select
						id="mailing_quater"
						class="mt-2"
						bind:value={$form.mailing_address.quarter}
						placeholder="Choose quater"
					>
						{#each quaters as { value, label }}
							<option {value}>{label}</option>
						{/each}
					</Select>
				</div>
				<div>
					<Label for="maling_street_name" class="mb-2">Boulevad / Street</Label>
					<Input
						bind:value={$form.mailing_address.street_name}
						type="text"
						id="maling_street_name"
						placeholder="Enter name of the street"
					/>
				</div>
				<div>
					<Label for="mailing_street_no" class="mb-2">Boulevad / Street No.</Label>
					<Input
						bind:value={$form.mailing_address.street_no}
						type="text"
						id="mailing_street_no"
						name="mailing_street_no"
						placeholder="Enter street no."
					/>
				</div>
				<div>
					<Label for="mailing_floor_no" class="mb-2">Floor No.</Label>
					<Input
						bind:value={$form.mailing_address.floor_no}
						type="text"
						id="mailing_floor_no"
						name="mailing_floor_no"
						placeholder="Enter floor no."
					/>
				</div>
				<div>
					<Label for="mailing_apt_no" class="mb-2">Apt. No.</Label>
					<Input
						bind:value={$form.mailing_address.apt_no}
						type="text"
						id="mailing_apt_no"
						placeholder="Enter apt. no."
						name="mailing_apt_no"
					/>
				</div>
				<div>
					<Label for="mailing_post_code" class="mb-2">Postal Code</Label>
					<Input
						bind:value={$form.mailing_address.post_code}
						type="text"
						id="mailing_post_code"
						placeholder="Enter postal code"
					/>
				</div>
			</div>
		</form>
	{:else if stepNames[currentStep - 1] === 'Contact Data'}
		<div class="grid grid-cols-3 gap-4 mb-2">
			<div></div>
			<div>
				<div class="flex flex-col">
					<Label for="phone_number" class="">Mobile Number</Label>
					<div class="flex items-end gap-2">
						<Input
							bind:value={$contactForm.phone_number}
							aria-invalid={$contactErrors.phone_number ? 'true' : undefined}
							{...$contactConstraints.phone_number}
							type="text"
							id="phone_number"
							placeholder="+359 88 123 4567"
							required
							color={$contactErrors.phone_number ? 'red' : undefined}
							class="flex-1"
						/>
						<Button
							pill
							class="mb-1"
							disabled={$contactForm.phone_number === ''}
							on:click={() => (phoneVerficationModal = true)}
						>
							Vaidate Mobile
						</Button>
					</div>
					{#if $contactErrors.phone_number}
						<Helper color="red">
							{$contactErrors.phone_number}
						</Helper>
					{/if}
				</div>
				<PhoneVerification
					phone={$contactForm.phone_number}
					bind:sendOTPOpen={phoneVerficationModal}
				/>
				<div>
					<Label for="email" class="mb-2">Email Address</Label>
					<div class="flex items-end gap-2">
						<Input
							bind:value={$contactForm.email}
							aria-invalid={$contactErrors.email ? 'true' : undefined}
							{...$contactConstraints.email}
							type="text"
							id="email"
							placeholder="E.g., email@company.bg"
							required
							color={$contactErrors.email ? 'red' : undefined}
						/>
						{#if $contactErrors.email}
							<Helper color="red">
								{$contactErrors.email}. Enter correct email format: email@email.email
							</Helper>
						{/if}
						<Button pill class="mt-4" type="submit" disabled={$contactForm.email === ''}>
							Send verification Email
						</Button>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	{/if}
</Card>

<DskSpinner title="Creating new client. Please wait!" bind:open={$delayed} />

<!-- <SuperDebug data={$contactForm} />
<SuperDebug data={$form} /> -->
