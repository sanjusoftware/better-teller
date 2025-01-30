<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Button, FloatingLabelInput, Helper } from 'flowbite-svelte';
	import {
		BellActiveAltOutline,
		FileCopyAltOutline,
		ProfileCardOutline
	} from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import Card from '$lib/utils/InfoCard.svelte';

	let { data } = $props();
	const { form, errors, constraints, message, enhance } = superForm(data.newClientForm);

	let steps = ['Profile Info', 'Employer Info', 'Documents', 'Notification Preferences'];
	let currentStep = $state(1);

	const handleProgress = (stepIncrement: number) => {
		if (stepIncrement == 1) {
			currentStep++;
			if (currentStep > steps.length) {
				currentStep = steps.length;
			}
		} else {
			currentStep--;
			if (currentStep < 1) {
				currentStep = 1;
			}
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

	{#if $message}<h3>{$message}</h3>{/if}

	<Card title="Personal Information" class="-mt-px max-w-none">
		<form method="POST" use:enhance>
			{currentStep} - {steps[currentStep - 1]}
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				{#if steps[currentStep - 1] === 'Profile Info'}
					<div>
						<FloatingLabelInput
							bind:value={$form.full_name}
							aria-invalid={$errors.full_name ? 'true' : undefined}
							{...$constraints.full_name}
							required
							style="outlined"
							id="full_name"
							name="full_name"
							type="text"
							color={$errors.full_name ? 'red' : undefined}
							class="col-span-6 space-y-2 sm:col-span-3"
						>
							Full Name
						</FloatingLabelInput>
						{#if $errors.full_name}
							<Helper color="red">
								{$errors.full_name}
							</Helper>
							<span class="invalid"></span>
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
				{:else}
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
				{/if}
			</div>
			<div>
				<Button
					class="w-fit whitespace-nowrap"
					type="submit"
					on:click={() => handleProgress(-1)}
					disabled={currentStep == 1}
				>
					Prev
				</Button>
				<Button
					class="w-fit whitespace-nowrap"
					type="submit"
					on:click={() => handleProgress(+1)}
					disabled={currentStep == steps.length}
				>
					Next
				</Button>
			</div>
		</form>
	</Card>
	<SuperDebug data={$form} />
</main>
