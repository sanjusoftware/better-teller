<script lang="ts">
	import { page } from '$app/state';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import SuperDebug from 'sveltekit-superforms';
	import SearchableSelect from 'svelte-select';
	import {
		Alert,
		ArrowKeyLeft,
		ArrowKeyRight,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Datepicker,
		Helper,
		Input,
		Label,
		Select,
		StepIndicator
	} from 'flowbite-svelte';

	import Card from '$lib/utils/InfoCard.svelte';
	import { IDTypes, IDSchema, profileSchema, employerSchema } from './clientSchema';

	let { data } = $props();
	let stepNames = ['ID Information', 'Personal Information', 'Employer Information'];
	let currentStep = $state(1);

	function previousStep() {
		currentStep = currentStep - 1;
	}

	let countries = [
		{ label: 'Bulgaria', value: 'bg' },
		{ label: 'USA', value: 'usa' },
		{ label: 'India', value: 'in' }
	];

	const { form, errors, allErrors, message, constraints, enhance, validateForm, options } =
		superForm(data.newClientForm, {
			// No need for hidden fields with dataType: 'json'
			dataType: 'json',
			async onSubmit({ cancel }) {
				// set validator to current steps schema, steps has index 0, so it must be (currentStep - 1)
				options.validators = [zod(IDSchema), zod(profileSchema), zod(employerSchema)][
					currentStep - 1
				];
				console.log('Total steps: ' + stepNames.length + ' Current step: ' + currentStep);
				console.log('Validators: ' + options.validators.shape);

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
</script>

<Breadcrumb class="mb-5">
	<BreadcrumbItem home>Clients</BreadcrumbItem>
	<BreadcrumbItem href={`/clients/${data.clientType}`}>
		{data.clientType.toLocaleUpperCase()} Clients
	</BreadcrumbItem>
	<BreadcrumbItem>New Client</BreadcrumbItem>
</Breadcrumb>

<StepIndicator {currentStep} steps={stepNames} />

<form method="POST" use:enhance>
	<Card class="-mt-px max-w-none mt-5">
		{#if $allErrors.length}
			<Alert color="red">
				<span class="font-medium">To continue, you need to have the following information:</span>
				<ul>
					{#each $allErrors as error}
						<li>
							{error.messages.join('. ')}
						</li>
					{/each}
				</ul>
			</Alert>
		{/if}

		{#if $message}
			<Alert color={page.status == 200 ? 'green' : 'red'}>
				<span class="font-medium">Success!!</span>
				{$message}
			</Alert>
		{/if}

		<div class="grid gap-6 mb-6 md:grid-cols-3">
			{#if stepNames[currentStep - 1] === 'ID Information'}
				<div>
					<Label class="mb-2">ID Document Issuing Country</Label>
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
				<Label>
					Select ID Type
					<Select
						class="mt-2"
						id="id_type"
						bind:value={$form.id_type}
						items={IDTypes}
						placeholder="Choose ID type..."
					/>
					{#if $errors.id_type}
						<Helper class="mt-2" color="red">
							{$errors.id_type}
						</Helper>
					{/if}
				</Label>
				<div>
					<Label for="id_number" class="mb-2">ID Number</Label>
					<Input
						bind:value={$form.id_number}
						aria-invalid={$errors.id_number ? 'true' : undefined}
						{...$constraints.id_number}
						type="text"
						id="id_number"
						placeholder="Enter ID Number"
						required
						color={$errors.id_number ? 'red' : undefined}
					/>
					{#if $errors.id_number}
						<Helper class="mt-2" color="red">
							{$errors.id_number}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="id_issue_date" class="mb-2">ID Issue Date</Label>
					<Datepicker bind:value={$form.id_issue_date} {...$constraints.id_issue_date}></Datepicker>
					{#if $errors.id_issue_date}
						<Helper class="mt-2" color="red">
							{$errors.id_issue_date}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="id_issue_date" class="mb-2">ID Expiry Date</Label>
					<Datepicker bind:value={$form.id_expiry_date} {...$constraints.id_expiry_date}
					></Datepicker>
					{#if $errors.id_expiry_date}
						<Helper class="mt-2" color="red">
							{$errors.id_expiry_date}
						</Helper>
					{/if}
				</div>
			{:else if stepNames[currentStep - 1] === 'Personal Information'}
				<div>
					<Label for="full_name" class="mb-2">Full Name</Label>
					<Input
						bind:value={$form.full_name}
						aria-invalid={$errors.full_name ? 'true' : undefined}
						{...$constraints.full_name}
						type="text"
						id="full_name"
						placeholder="Jon Doe"
						required
						color={$errors.full_name ? 'red' : undefined}
					/>
					{#if $errors.full_name}
						<Helper class="mt-2" color="red">
							{$errors.full_name}
						</Helper>
					{/if}
				</div>
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
				<div>
					<Label for="date_of_birth" class="mb-2">Birth Date</Label>
					<Datepicker bind:value={$form.date_of_birth} {...$constraints.date_of_birth}></Datepicker>
					{#if $errors.date_of_birth}
						<Helper class="mt-2" color="red">
							{$errors.date_of_birth}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="street" class="mb-2">Street</Label>
					<Input
						bind:value={$form.address.street}
						aria-invalid={$errors.address ? 'true' : undefined}
						{...$constraints.address?.street}
						type="text"
						id="street"
						placeholder="Enter Street"
						required
						color={$errors.address?.street ? 'red' : undefined}
					/>
					{#if $errors.address?.street}
						<Helper class="mt-2" color="red">
							{$errors.address.street}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="address" class="mb-2">City</Label>
					<Input
						bind:value={$form.address.city}
						aria-invalid={$errors.address ? 'true' : undefined}
						{...$constraints.address}
						type="text"
						id="address"
						placeholder="Enter City"
						required
						color={$errors.address?.city ? 'red' : undefined}
					/>
					{#if $errors.address?.city}
						<Helper class="mt-2" color="red">
							{$errors.address.city}
						</Helper>
					{/if}
				</div>
				<div>
					<Label for="zipcode" class="mb-2">Zip/postal Code</Label>
					<Input
						bind:value={$form.address.zip_code}
						aria-invalid={$errors.address ? 'true' : undefined}
						{...$constraints.address?.zip_code}
						type="text"
						id="zipcode"
						placeholder="Enter Zip/postal Code (e.g., 1000)"
						required
						color={$errors.address?.zip_code ? 'red' : undefined}
					/>
					{#if $errors.address?.zip_code}
						<Helper class="mt-2" color="red">
							{$errors.address.zip_code}
						</Helper>
					{/if}
				</div>
				<div>
					<Label class="mb-2">Country of residence</Label>
					<SearchableSelect
						showChevron={true}
						id="nationality"
						name="nationality"
						class="py-2"
						bind:justValue={$form.address.country}
						items={countries}
						placeholder="Select or search country..."
						--font-size="1"
						clearable={false}
					/>
					{#if $errors.address?.country}
						<Helper class="mt-2" color="red">
							{$errors.address.country}
						</Helper>
					{/if}
				</div>
			{:else if stepNames[currentStep - 1] === 'Employer Information'}
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
				<div>
					<Label for="employment_start_date" class="mb-2">Employment Start Date</Label>
					<Datepicker
						bind:value={$form.employment_start_date}
						{...$constraints.employment_start_date}
					></Datepicker>
					{#if $errors.employment_start_date}
						<Helper class="mt-2" color="red">
							{$errors.employment_start_date}
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
