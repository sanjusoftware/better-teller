<script lang="ts">
	import { enhance } from '$app/forms';
	import { LocalStorage } from '$lib/localstorage.svelte';
	import { Alert, Button, Modal } from 'flowbite-svelte';
	import { page } from '$app/state';
	import { getFlash } from 'sveltekit-flash-message';
	const flash = getFlash(page);

	let { phone = '', open = $bindable(false) } = $props();

	let isSending = $state(false);
	let isValidating = $state(false);
	let canResend = $state(false);
	let otpSent = new LocalStorage('otp', '');
	let otpRecieved = $state(Array(6).fill(''));
	let validateOTPOpen = $state(false);
	let validationError = $state('');

	function handleInput(event, index) {
		const value = event.target.value;

		// If a 6-digit OTP is pasted, split and fill the inputs
		if (value.length === 6) {
			otpRecieved = value.split('');
			return;
		}

		// Allow only numeric input
		if (!/^\d$/.test(value)) {
			event.target.value = '';
			return;
		}

		otpRecieved[index] = value;

		// Move to the next input if available
		const nextInput = document.getElementById(`otp-${index + 1}`);
		if (nextInput) {
			nextInput.focus();
		}
	}

	async function resendSMS() {
		canResend = false;
		isSending = true;
		// Simulate resending OTP
		await new Promise((resolve) => setTimeout(resolve, 2000));
		isSending = false;

		// Enable resend button after 30 seconds
		setTimeout(() => {
			canResend = true;
		}, 30000);
	}
</script>

<!-- Modal for sending OTP for phone verification -->
<Modal
	title={isSending ? 'Sending OTP...' : 'Phone Verification'}
	classHeader="text-gray-900"
	bind:open
	size="sm"
	autoclose={false}
>
	<p class="text-sm text-gray-500 dark:text-gray-400 text-left">
		Send OTP to the client't registered phone number:
		<span class="font-semibold text-gray-900">{phone}</span>
	</p>
	<form
		method="POST"
		action="?/sendOTP"
		use:enhance={() => {
			isSending = true;
			return ({ result, update }) => {
				update().finally(async () => {
					if (result.type === 'success') {
						isSending = false;
						otpSent.current = result.data?.otp;
						validateOTPOpen = true;
					} else {
						new Error('Error sending OTP : ' + result.status);
					}
				});
			};
		}}
	>
		<input name="phonenumber" type="hidden" value={phone} />
		<div class="flex items-center justify-between">
			<Button pill type="submit" class="flex-shrink-0 ml-2" disabled={isSending}>
				{isSending ? 'Sending...' : 'Send OTP'}
			</Button>
			<Button pill outline color="light" on:click={resendSMS} disabled={!canResend}>
				Resend OTP
			</Button>
			<Button pill outline color="red" on:click={() => (open = false)}>Cancel</Button>
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
		Enter the OTP recieved by the customer on their registered phone number:
		<span class="font-semibold text-gray-900">{phone}</span>
	</p>
	{#if validationError}
		<Alert color="red" class="mb-4" dismissable>
			{validationError}
		</Alert>
	{/if}
	<form
		method="POST"
		action="?/validateOTP"
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
						open = false;
					} else {
						validationError = result.data?.error;
						new Error('Error validating OTP : ' + result.status);
					}
				});
			};
		}}
	>
		<div class="mb-4">
			<label for="otp" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Enter OTP
			</label>
			<div class="flex space-x-2">
				{#each Array(6) as _, index}
					<input
						id="otp-{index}"
						name="otp-{index}"
						type="text"
						maxlength="1"
						class="w-10 h-10 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						bind:value={otpRecieved[index]}
						oninput={(e) => handleInput(e, index)}
						required
					/>
				{/each}
				<input type="hidden" name="otpRecieved" value={otpRecieved.join('')} />
				<input type="hidden" name="otpSent" value={otpSent.current} />
			</div>
		</div>
		<div class="flex items-center justify-between">
			<Button pill type="submit" class="flex-shrink-0 ml-2" disabled={isValidating}>
				{isSending ? 'Validating...' : 'Validate'}
			</Button>
			<Button pill outline color="red" on:click={() => (validateOTPOpen = false)}>Cancel</Button>
		</div>
	</form>
</Modal>
