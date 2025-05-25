<script lang="ts">
	import { page } from '$app/state';
	import {
		Alert,
		ArrowKeyLeft,
		ArrowKeyRight,
		Badge,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Datepicker,
		Heading,
		Helper,
		Input,
		Label,
		Select,
		StepIndicator,
		Toggle
	} from 'flowbite-svelte';
	import SearchableSelect from 'svelte-select';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import SuperDebug from 'sveltekit-superforms';
	import Card from '$lib/utils/InfoCard.svelte';
	import { gdprSchema, IDSchema, contactSchema } from '$lib/schemas/clientSchema';

	let { data } = $props();
	let stepNames = ['ID Information', 'Contact Data', 'GDPR, KYC Documents'];
	let currentStep = $state(1);
	function previousStep() {
		currentStep = currentStep - 1;
	}

	import { countries, genders, locations, quaters } from '$lib/utils/constants';
	import IDCard from '$lib/utils/IDCard.svelte';

	const { form, errors, message, constraints, enhance, validateForm, options, capture, restore } =
		superForm(data.newClientForm, {
			// No need for hidden fields with dataType: 'json'
			dataType: 'json',
			async onSubmit({ cancel }) {
				// set validator to current steps schema, steps has index 0, so it must be (currentStep - 1)
				options.validators = [zod(IDSchema), zod(contactSchema), zod(gdprSchema)][currentStep - 1];
				console.log('Total steps: ' + stepNames.length + ' Current step: ' + currentStep);
				// console.log('Validators: ' + options.validators.shape);

				console.log('validting form');
				// Make a manual client-side validation, since we have cancelled
				const result = await validateForm({ update: true });

				console.log(result.errors);
				if (!result.valid) {
					cancel();
					return;
				}

				// If it's valid, go to next step
				if (currentStep < stepNames.length) {
					cancel();
					currentStep = currentStep + 1;
				}
				console.log('Step after validation: ' + currentStep);

				// If on last step, submit the form
				return;
			},

			async onResult({ result }) {
				if (result.type === 'success') {
					document.scrollingElement?.scrollTo({
						top: 0,
						behavior: 'smooth'
					});
				}
			}
		});
	export const snapshot = { capture, restore };
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Clients</BreadcrumbItem>
	<BreadcrumbItem>New Client</BreadcrumbItem>
</Breadcrumb>

<StepIndicator {currentStep} steps={stepNames} />

<form method="POST" use:enhance>
	<Card class="-mt-px max-w-none mt-5">
		{#if $message}
			<Alert color={page.status == 200 ? 'green' : 'red'}>
				{page.status == 200 ? 'Success!' : 'Error!'}
				{$message}
			</Alert>
		{/if}

		{#if stepNames[currentStep - 1] === 'ID Information'}
			<div class="grid grid-cols-2 gap-4 mb-6">
				<Card>
					<IDCard
						IDForntImage={'https://upload.wikimedia.org/wikipedia/commons/a/ae/New_Bulgarian_ID_card_(front).png'}
						IDBackImage={'https://upload.wikimedia.org/wikipedia/commons/2/2b/Bulgarian_Identity_card_-_back_(2024).png'}
					/>
				</Card>
				<Card class="flex flex-col items-center justify-center h-full py-8">
					<Badge rounded border color="red" class="p-5 text-lg font-medium mb-5">
						No existing client found with the ID card.
					</Badge>
					<h1 class="font-bold text-2xl mb-5 text-gray-900">Do you want to create new client?</h1>
					<div class="flex gap-4">
						<Button pill outline color="red" class="px-10">No</Button>
						<Button pill color="green" class="px-10">Yes</Button>
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
					<Label for="id_issue_date" class="mb-2">ID issue date - {$form.id_issue_date}</Label>
					<Datepicker bind:value={$form.id_issue_date} {...$constraints.id_issue_date}></Datepicker>
					{#if $errors.id_issue_date}
						<Helper class="mt-2" color="red">
							{$errors.id_issue_date}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="id_expiry_date" class="mb-2">ID expiry date - {$form.id_expiry_date}</Label>
					<Datepicker bind:value={$form.id_expiry_date} {...$constraints.id_expiry_date}
					></Datepicker>
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
					<SearchableSelect
						showChevron={true}
						id="issuing_country"
						name="issuing_country"
						class="py-2"
						bind:justValue={$form.issuing_country}
						items={countries}
						placeholder="Select or search country..."
						--font-size="1"
						clearable={false}
					/>
					{#if $errors.issuing_country}
						<Helper class="mt-2" color="red">
							{$errors.issuing_country}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="date_of_birth" class="mb-2">Date of birth - {$form.date_of_birth}</Label>
					<Datepicker bind:value={$form.date_of_birth} {...$constraints.date_of_birth}></Datepicker>
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
						required
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
					<SearchableSelect
						showChevron={true}
						id="citizenship"
						name="citizenship"
						class="py-2"
						bind:justValue={$form.citizenship}
						items={countries}
						placeholder="Select or search country..."
						--font-size="1"
						clearable={false}
					/>
					{#if $errors.citizenship}
						<Helper class="mt-2" color="red">
							{$errors.citizenship}
						</Helper>
					{/if}
				</div>
				<div>
					<Label class="mb-2">Gender</Label>
					<Select id="countries" class="mt-2" bind:value={$form.gender} placeholder="">
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
						Matches Correspondence Address?
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
					{#if $errors.mailing_address?.location}
						<Helper class="mt-2" color="red">
							{$errors.mailing_address?.location}
						</Helper>
					{/if}
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
					{#if $errors.mailing_address?.quarter}
						<Helper class="mt-2" color="red">
							{$errors.mailing_address?.quarter}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="maling_street_name" class="mb-2">Boulevad / Street</Label>
					<Input
						bind:value={$form.mailing_address.street_name}
						aria-invalid={$errors.mailing_address?.street_name ? 'true' : undefined}
						{...$constraints.mailing_address?.street_name}
						type="text"
						id="maling_street_name"
						placeholder="Enter name of the street"
						required
						color={$errors.mailing_address?.street_name ? 'red' : undefined}
					/>
					{#if $errors.mailing_address?.street_name}
						<Helper class="mt-2" color="red">
							{$errors.mailing_address?.street_name}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="mailing_street_no" class="mb-2">Boulevad / Street No.</Label>
					<Input
						bind:value={$form.mailing_address.street_no}
						aria-invalid={$errors.mailing_address?.street_no ? 'true' : undefined}
						{...$constraints.mailing_address?.street_no}
						type="text"
						id="mailing_street_no"
						placeholder="Enter street no."
						required
						color={$errors.mailing_address?.street_no ? 'red' : undefined}
					/>
					{#if $errors.mailing_address?.street_no}
						<Helper class="mt-2" color="red">
							{$errors.mailing_address?.street_no}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="mailing_floor_no" class="mb-2">Floor No.</Label>
					<Input
						bind:value={$form.mailing_address.floor_no}
						aria-invalid={$errors.mailing_address?.floor_no ? 'true' : undefined}
						{...$constraints.mailing_address?.floor_no}
						type="text"
						id="mailing_floor_no"
						placeholder="Enter floor no."
						required
						color={$errors.mailing_address?.floor_no ? 'red' : undefined}
					/>
					{#if $errors.mailing_address?.floor_no}
						<Helper class="mt-2" color="red">
							{$errors.mailing_address?.floor_no}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="mailing_apt_no" class="mb-2">Apt. No.</Label>
					<Input
						bind:value={$form.mailing_address.apt_no}
						aria-invalid={$errors.mailing_address?.apt_no ? 'true' : undefined}
						{...$constraints.mailing_address?.apt_no}
						type="text"
						id="mailing_apt_no"
						placeholder="Enter apt. no."
						required
						color={$errors.mailing_address?.apt_no ? 'red' : undefined}
					/>
					{#if $errors.mailing_address?.apt_no}
						<Helper class="mt-2" color="red">
							{$errors.mailing_address?.apt_no}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="mailing_post_code" class="mb-2">Postal Code</Label>
					<Input
						bind:value={$form.mailing_address.post_code}
						aria-invalid={$errors.mailing_address?.post_code ? 'true' : undefined}
						{...$constraints.mailing_address?.post_code}
						type="text"
						id="mailing_post_code"
						placeholder="Enter postal code"
						required
						color={$errors.mailing_address?.post_code ? 'red' : undefined}
					/>
					{#if $errors.mailing_address?.post_code}
						<Helper class="mt-2" color="red">
							{$errors.mailing_address?.post_code}
						</Helper>
					{/if}
				</div>
			</div>
		{/if}
		<div class="grid gap-6 mb-6 md:grid-cols-3">
			{#if stepNames[currentStep - 1] === 'Contact Data'}
				<div>
					<Label for="email" class="mb-2">Email Address</Label>
					<Input
						bind:value={$form.email}
						aria-invalid={$errors.email ? 'true' : undefined}
						{...$constraints.email}
						type="text"
						id="email"
						placeholder="E.g., email@company.bg"
						required
						color={$errors.email ? 'red' : undefined}
					/>
					{#if $errors.email}
						<Helper color="red">
							{$errors.email}. Enter correct email format: email@email.email
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="phone_number" class="mb-2">Phone Number</Label>
					<Input
						bind:value={$form.phone_number}
						aria-invalid={$errors.phone_number ? 'true' : undefined}
						{...$constraints.phone_number}
						type="text"
						id="phone_number"
						placeholder="+359 88 123 4567"
						required
						color={$errors.phone_number ? 'red' : undefined}
					/>
					{#if $errors.phone_number}
						<Helper color="red">
							{$errors.phone_number}
						</Helper>
					{/if}
				</div>
			{:else if stepNames[currentStep - 1] === 'GDPR, KYC Documents'}
				<div>
					<Label for="employer_name" class="mb-2">Employer Name</Label>
					<Input
						bind:value={$form.employer_name}
						aria-invalid={$errors.employer_name ? 'true' : undefined}
						{...$constraints.employer_name}
						type="text"
						id="employer_name"
						placeholder="E.g., DSK Bank"
						required
						color={$errors.employer_name ? 'red' : undefined}
					/>
					{#if $errors.employer_name}
						<Helper class="mt-2" color="red">
							{$errors.employer_name}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="designation" class="mb-2">Designation</Label>
					<Input
						bind:value={$form.designation}
						aria-invalid={$errors.designation ? 'true' : undefined}
						{...$constraints.designation}
						type="text"
						id="designation"
						placeholder="E.g., Software Engineer"
						required
						color={$errors.designation ? 'red' : undefined}
					/>
					{#if $errors.designation}
						<Helper class="mt-2" color="red">
							{$errors.designation}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="salary" class="mb-2">Salary</Label>
					<Input
						bind:value={$form.salary}
						aria-invalid={$errors.salary ? 'true' : undefined}
						{...$constraints.salary}
						type="number"
						id="salary"
						placeholder="E.g., 50000"
						required
						color={$errors.salary ? 'red' : undefined}
					/>
					{#if $errors.salary}
						<Helper class="mt-2" color="red">
							{$errors.salary}
						</Helper>
					{/if}
				</div>
			{/if}
		</div>
		<div class="grid gap-6 md:grid-cols-4">
			<div>
				{#if currentStep > 1}
					<Button
						color="green"
						class="w-fit whitespace-nowrap"
						type="submit"
						onclick={previousStep}
					>
						<ArrowKeyLeft class="w-4 h-4 me-2" />
						{stepNames[currentStep - 2]}
					</Button>
				{/if}
			</div>
			<div></div>
			<div></div>
			<div style="text-align: right;">
				<Button color="green" class="w-fit whitespace-nowrap" type="submit">
					<span class="me-2">
						{#if currentStep == stepNames.length}
							Submit {stepNames[currentStep]}
						{:else}
							{stepNames[currentStep]}
						{/if}
					</span>
					<ArrowKeyRight class="w-4 h-4" />
				</Button>
			</div>
		</div>
	</Card>
</form>
<SuperDebug data={$form} />
