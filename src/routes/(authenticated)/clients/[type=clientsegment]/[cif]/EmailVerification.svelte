<script lang="ts">
	import { enhance } from '$app/forms';
	import { LocalStorage } from '$lib/localstorage.svelte';
	import { Alert, Button, Modal } from 'flowbite-svelte';

	let { email = '', sendOTPOpen = $bindable(false) } = $props();
	let isSending = $state(false);
	let isValidating = $state(false);
	let otpSent = new LocalStorage('otp', '');
	let otpRecieved = $state(Array(6).fill(''));
	let validateOTPOpen = $state(false);
	let validationError = $state('');

	function handleInput(event: Event, index: number) {
		// Cast the event target to HTMLInputElement
		const input = event.target as HTMLInputElement;
		const value = input.value;

		// If the input is empty, focus on the previous input
		if (value === '') {
			const prevInput = document.getElementById(`otp-${index - 1}`);
			if (prevInput) {
				prevInput.focus();
			}
			return;
		}

		// Allow only numeric input
		if (!/^\d$/.test(value)) {
			input.value = ''
			return;
		}

		otpRecieved[index] = value;

		// Move to the next input if available
		const nextInput = document.getElementById(`otp-${index + 1}`);
		if (nextInput) {
			nextInput.focus();
		}
	}

	function handlePaste(event: ClipboardEvent) {
		const value = event.clipboardData?.getData('text');
		// If a 6-digit OTP is pasted, split and fill the inputs
		if (value?.length === 6) {
			// Get all input fields
			const inputs = document.querySelectorAll('[data-focus-input-init]');
			const digits = value.replace(/\D/g, ''); // Only take numbers from the pasted data

			// Iterate over the inputs and assign values from the pasted string
			inputs.forEach((input, index) => {
				if (digits[index]) {
					(input as HTMLInputElement).value = digits[index];
					otpRecieved[index] = digits[index];
				}
			});
			document.getElementById(`otp-${5}`)?.focus();
			return;
		}
	}
</script>

<!-- Modal for sending OTP for email verification -->
<Modal
	title={isSending ? 'Sending OTP...' : 'Email Verification'}
	classHeader="text-gray-900"
	bind:open={sendOTPOpen}
	size="sm"
	autoclose={false}
>
	<p class="text-sm text-gray-500 dark:text-gray-400 text-left">
		Send OTP to the client't registered email:
		<span class="font-semibold text-gray-900">{email}</span>
	</p>
	<form
		method="POST"
		action="/otp?/sendEmail"
		use:enhance={() => {
			isSending = true;
			return ({ result, update }) => {
				update().finally(async () => {
					if (result.type === 'success') {
						isSending = false;
						otpSent.current = result.data?.otp;
						validateOTPOpen = true;
						sendOTPOpen = false;
					} else {
						new Error('Error sending OTP : ' + result.status);
					}
				});
			};
		}}
	>
		<input name="email" type="hidden" value={email} />
		<div class="flex items-center justify-between">
			<Button pill type="submit" class="flex-shrink-0 ml-2" disabled={isSending}>
				{isSending ? 'Sending...' : 'Send OTP'}
			</Button>
			<Button pill outline color="red" on:click={() => (sendOTPOpen = false)}>Cancel</Button>
		</div>
	</form>
</Modal>

<!-- Modal for verifying OTP -->
<Modal
	title="Validate OTP"
	classHeader="text-gray-900"
	bind:open={validateOTPOpen}
	size="sm"
	autoclose={false}
>
	<p class="text-sm text-gray-500 dark:text-gray-400 text-left">
		<span class="font-semibold text-gray-900">Enter 6 digit OTP</span>
		recieved by the customer on their email:
		<span class="font-semibold text-gray-900">{email}</span>
	</p>
	{#if validationError}
		<Alert color="red" class="mb-4" dismissable>
			{validationError}
		</Alert>
	{/if}
	<form
		method="POST"
		action="/otp?/validateOTP"
		use:enhance={() => {
			isValidating = true;
			return ({ result, update }) => {
				update().finally(async () => {
					console.log('Result:', result); // Debug the result
					isValidating = false;
					validationError = '';
					if (result.type === 'success') {
						otpSent.current = '';
						validateOTPOpen = false;
						sendOTPOpen = false;
					} else {
						validationError = result.data?.error;
						new Error('Error validating OTP : ' + result.status);
					}
				});
			};
		}}
	>
		<div class="mb-4">
			<div class="flex justify-center space-x-2 rtl:space-x-reverse">
				{#each Array(6) as _, index}
					<input
						id="otp-{index}"
						name="otp-{index}"
						type="text"
						maxlength="1"
						data-focus-input-init
						class="w-10 h-10 text-center font-bold rounded-md border-gray-500 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
						bind:value={otpRecieved[index]}
						oninput={(e) => handleInput(e, index)}
						onpaste={(e) => handlePaste(e)}
						required
					/>
				{/each}
				<input type="hidden" name="otpRecieved" value={otpRecieved.join('')} />
				<input type="hidden" name="otpSent" value={otpSent.current} />
			</div>
		</div>
		<div class="flex items-center justify-between">
			<Button
				pill
				outline
				color="light"
				on:click={() => ((validateOTPOpen = false), (sendOTPOpen = true))}
			>
				Back
			</Button>
			<Button
				pill
				type="submit"
				class="flex-shrink-0 ml-2"
				disabled={otpRecieved.some((digit) => digit === '') || isValidating}
			>
				{isValidating ? 'Validating...' : 'Validate'}
			</Button>
		</div>
	</form>
</Modal>
