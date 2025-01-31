<script lang="ts">
	import { page } from '$app/state';
	import { zod } from 'sveltekit-superforms/adapters';
	import { schemaEmployerInfo, schemaProfileInfo } from './clientSchema';

	import Card from '$lib/utils/InfoCard.svelte';
	import { Breadcrumb, BreadcrumbItem, Button, FloatingLabelInput, Helper } from 'flowbite-svelte';
	import {
		BellActiveAltOutline,
		FileCopyAltOutline,
		ProfileCardOutline
	} from 'flowbite-svelte-icons';
	import SuperDebug, { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const steps = [zod(schemaProfileInfo), zod(schemaEmployerInfo)];

	let stepNames = ['Personal Information', 'Employer Information'];

	let currentStep = $state(1);

	// $: options.validators = steps[currentStep - 1];

	const { form, errors, message, constraints, enhance, validateForm } = superForm(
		data.newClientForm,
		{
			// set validator to current steps schema, steps has index 0, so it must be (currentStep - 1)
			validators: steps[(() => currentStep)() - 1],

			// No need for hidden fields with dataType: 'json'
			dataType: 'json',

			async onSubmit({ cancel }) {
				console.log('Total steps: ' + steps.length + ' Current step: ' + currentStep);
				console.log('Validator: ');
				console.log(steps[currentStep - 1]);

				// If on last step, make a normal request
				if (currentStep == steps.length) return;
				else cancel();

				console.log('validting form');
				// Make a manual client-side validation, since we have cancelled
				const result = await validateForm({ update: true });

				console.log(result.errors);
				if (result.valid) currentStep += 1;
				console.log('Step after validation: ' + currentStep);
			},

			async onUpdated({ form }) {
				if (form.valid) currentStep = 1;
			}
		}
	);

	const goBack = () => {
		currentStep--;
		if (currentStep < 1) {
			currentStep = 1;
		}
	};
	const updateStepLiClass = (step: number) => {
		return currentStep > step ? finishedStepLiClass : remainingStepLiClass;
	};

	const updateStepSpanClass = (step: number) => {
		return currentStep >= step ? finishedStepSpanClass : remainingStepSpanClass;
	};

	let finishedStepLiClass =
		"flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-green-100 after:border-4 after:inline-block dark:after:border-green-800";
	let finishedStepSpanClass =
		'flex items-center justify-center w-10 h-10 bg-green-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-800 shrink-0';
	let remainingStepLiClass =
		"flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700";
	let remainingStepSpanClass =
		'flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0';
</script>

<main class="p-4 relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<Breadcrumb class="mb-5">
		<BreadcrumbItem home>Clients</BreadcrumbItem>
		<BreadcrumbItem href={`/clients/${data.clientType}`}>
			{data.clientType.toLocaleUpperCase()} Clients
		</BreadcrumbItem>
		<BreadcrumbItem>New Client</BreadcrumbItem>
	</Breadcrumb>

	<!-- Progress Bar -->
	<ol class="flex items-center w-full mb-5">
		<li class={updateStepLiClass(1)}>
			<span class={updateStepSpanClass(1)}>
				<ProfileCardOutline size="lg" color="green" />
			</span>
		</li>
		<li class={updateStepLiClass(2)}>
			<span class={updateStepSpanClass(2)}>
				<FileCopyAltOutline size="lg" color="grey" />
			</span>
		</li>
		<li class="flex w-full items-center">
			<span class={updateStepSpanClass(3)}>
				<BellActiveAltOutline size="lg" color="grey" />
			</span>
		</li>
	</ol>

	{#if $message}
		<!-- eslint-disable-next-line svelte/valid-compile -->
		<div class="status" class:error={page.status >= 400} class:success={page.status == 200}>
			{$message}
		</div>
	{/if}

	<form method="POST" use:enhance>
		<Card title={stepNames[currentStep - 1]} class="-mt-px max-w-none">
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				{#if stepNames[currentStep - 1] === 'Personal Information'}
					<div>
						<FloatingLabelInput
							bind:value={$form.first_name}
							aria-invalid={$errors.first_name ? 'true' : undefined}
							{...$constraints.first_name}
							required
							style="outlined"
							id="first_name"
							name="first_name"
							type="text"
							color={$errors.first_name ? 'red' : undefined}
							class="col-span-6 space-y-2 sm:col-span-3"
						>
							First Name
						</FloatingLabelInput>
						{#if $errors.first_name}
							<Helper color="red">
								{$errors.first_name}
							</Helper>
						{/if}
					</div>
					<div>
						<FloatingLabelInput
							bind:value={$form.last_name}
							aria-invalid={$errors.last_name ? 'true' : undefined}
							{...$constraints.last_name}
							required
							style="outlined"
							id="last_name"
							name="last_name"
							type="text"
							color={$errors.last_name ? 'red' : undefined}
							class="col-span-6 space-y-2 sm:col-span-3"
						>
							Last Name
						</FloatingLabelInput>
						{#if $errors.last_name}
							<Helper color="red">
								{$errors.last_name}
							</Helper>
						{/if}
					</div>
					<div>
						<FloatingLabelInput
							bind:value={$form.email}
							aria-invalid={$errors.email ? 'true' : undefined}
							{...$constraints.email}
							required
							style="outlined"
							id="email"
							name="email"
							type="text"
							color={$errors.email ? 'red' : undefined}
						>
							Email
						</FloatingLabelInput>
						{#if $errors.email}
							<Helper color="red">
								{$errors.email}. Enter correct email format: email@email.email
							</Helper>
						{:else}
							<Helper color="gray">E.g : email@email.email</Helper>
						{/if}
					</div>
				{:else if stepNames[currentStep - 1] === 'Employer Information'}
					<div>
						<FloatingLabelInput
							bind:value={$form.employer_name}
							aria-invalid={$errors.employer_name ? 'true' : undefined}
							{...$constraints.employer_name}
							required
							style="outlined"
							id="employer_name"
							name="employer_name"
							type="text"
							color={$errors.employer_name ? 'red' : undefined}
						>
							Employer Name
						</FloatingLabelInput>
						{#if $errors.employer_name}
							<Helper color="red">
								{$errors.employer_name}
							</Helper>
						{/if}
					</div>
					<div>
						<FloatingLabelInput
							bind:value={$form.designation}
							aria-invalid={$errors.designation ? 'true' : undefined}
							{...$constraints.designation}
							required
							style="outlined"
							id="designation"
							name="designation"
							type="text"
							color={$errors.designation ? 'red' : undefined}
						>
							Designation
						</FloatingLabelInput>
						{#if $errors.designation}
							<Helper color="red">
								{$errors.designation}
							</Helper>
						{/if}
					</div>
				{/if}
			</div>
			<div>
				<Button
					class="w-fit whitespace-nowrap"
					type="submit"
					disabled={currentStep == 1}
					on:click={() => goBack()}
				>
					Prev
				</Button>
				<Button class="w-fit whitespace-nowrap" type="submit">
					{#if currentStep == steps.length}
						Submit
					{:else}
						Next
					{/if}
				</Button>
			</div>
		</Card>
	</form>

	<SuperDebug data={$form} />
</main>
