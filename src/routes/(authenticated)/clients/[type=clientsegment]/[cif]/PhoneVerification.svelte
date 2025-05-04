<script lang="ts">
	import { enhance } from '$app/forms';
	import { LocalStorage } from '$lib/localstorage.svelte';
	import { Button, Modal } from 'flowbite-svelte';

	let { phone = '', open = $bindable(false) } = $props();

	// let otp = $state('');
	let isSending = $state(false);
	let canResend = $state(false);

	let otp = $state(Array(6).fill(''));

	async function verifyPhone() {
		isSending = true;
		// Simulate sending OTP
		await new Promise((resolve) => setTimeout(resolve, 2000));
		isSending = false;
		canResend = false;

		// Enable resend button after 30 seconds
		setTimeout(() => {
			canResend = true;
		}, 30000);
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

	let otpSent = new LocalStorage('otp', '');
</script>

<!-- Modal for sending OTP for phone verification -->
<Modal
	title="Phone Verification"
	classHeader="text-gray-900"
	bind:open={open}
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
					} else {
						new Error('Error sending OTP : ' + result.status);
					}
				});
			};
		}}
	>
		<input name="phonenumber" type="hidden" value={phone} />
		<!-- <div class="mb-4">
			<label for="otp" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Enter OTP
			</label>
			<div class="flex space-x-2">
				{#each Array(6) as _, index}
					<input
						id="otp-{index}"
						type="text"
						maxlength="1"
						class="w-10 h-10 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						bind:value={otp[index]}
						on:input={(e) => handleInput(e, index)}
						required
					/>
				{/each}
			</div>
		</div> -->
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
