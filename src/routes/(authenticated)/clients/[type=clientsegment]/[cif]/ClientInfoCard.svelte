<script lang="ts">
	import { enhance } from '$app/forms';
	import { humanize } from '$lib/utils/strings';
	import { Button, Card, Modal, Tooltip } from 'flowbite-svelte';
	import {
		CheckCircleOutline,
		CloseCircleOutline
	} from 'flowbite-svelte-icons';
	import IDCard from './IDCard.svelte';
	import { LocalStorage } from '$lib/localstorage.svelte';
	let phoneVerficationModal = $state(true);
	let emailVerficationModal = $state(false);

	let { client } = $props();

	async function cancelPhoneVerification() {
		phoneVerficationModal = false;
	}
	async function openVerifyPhoneModal() {
		phoneVerficationModal = true;
	}

	// let otp = $state('');
	let isSending = $state(false);
	let canResend = $state(false);

	let otp = $state(Array(6).fill(''));

	function handleInput(event, index) {
		const value = event.target.value;

		// If a 6-digit OTP is pasted, split and fill the inputs
		if (value.length === 6) {
			otp = value.split('');
			return;
		}

		// Allow only numeric input
		if (!/^\d$/.test(value)) {
			event.target.value = '';
			return;
		}

		otp[index] = value;

		// Move to the next input if available
		const nextInput = document.getElementById(`otp-${index + 1}`);
		if (nextInput) {
			nextInput.focus();
		}
	}

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

	let otpSent = new LocalStorage("otp", '');
</script>

<h2 class="text-md font-semibold text-gray-500 mb-2">Client's Information</h2>
<Card class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-4">
	<!-- <Alert dismissable color="blue" class="mb-2 p-2">
		<div class="flex items-center gap-3">
			<InfoCircleSolid class="w-5 h-5" />
			<p class="mt-2 mb-4 text-sm text-gray-900 dark:text-gray-200">
				The client's information is not verified yet. Please verify the client's information before
				proceeding with any transactions.
			</p>
		</div>
	</Alert> -->
	<IDCard IDForntImage={client.id_card_front_image} IDBackImage={client.id_card_back_image} />
	<div class="grid grid-cols-1 gap-2 xl:grid-cols-1 xl:gap-4">
		<div class="flex flex-col space-y-2">
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Name</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					{client.name}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">ID number</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					#{client.cif}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Nationality</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					{client.country}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Type</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					{humanize(client.type)}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Phone number</div>
				<div class="flex items-center justify-between w-full">
					<span class="text-gray-900 dark:text-gray-200 font-semibold">
						{client.phone}
					</span>
					<div class="flex items-center space-x-1">
						{#if client.phone_verified}
							<CheckCircleOutline class="mr-1" size="sm" color="green" />
							<Tooltip>
								<span class="text-xs">Phone Verified</span>
							</Tooltip>
						{:else}
							<CloseCircleOutline class="mr-1" size="sm" color="red" />
							<Tooltip>
								<span class="text-xs">Phone Unverified</span>
							</Tooltip>
							<Button size="xs" outline class="p-1 text-xs" on:click={openVerifyPhoneModal}>
								Verify
							</Button>
						{/if}
					</div>
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Phone number</div>
				<div class="flex items-center justify-between w-full">
					<span class="text-gray-900 dark:text-gray-200 font-semibold">
						{client.email}
					</span>
					{#if client.email_verified}
						<CheckCircleOutline class="mr-1" size="sm" color="green" />
						<Tooltip>
							<span class="text-xs">Verified</span>
						</Tooltip>
					{:else}
						<div class="flex items-center space-x-1">
							<CloseCircleOutline class="mr-1" size="sm" color="red" />
							<Tooltip>
								<span class="text-xs">Not verified</span>
							</Tooltip>
							<Button
								size="xs"
								outline
								class="p-1 text-xs"
								onclick={() => (emailVerficationModal = true)}
							>
								Verify
							</Button>
						</div>
					{/if}
				</div>
			</div>
			<div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Client's address</div>
				<div class="text-gray-900 dark:text-gray-200 font-semibold">
					{client.address}
				</div>
			</div>
		</div>
	</div>
</Card>

<!-- Modal for sending OTP for phone verification -->
<Modal
	title="Phone Verification"
	classHeader="text-gray-900"
	bind:open={phoneVerficationModal}
	size="sm"
	autoclose={false}
>
	<p class="text-sm text-gray-500 dark:text-gray-400 text-left">
		Send OTP to the client't registered phone number:
		<span class="font-semibold text-gray-900">{client.phone}</span>
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
		<input name ="phonenumber" type="hidden" value={client.phone} />
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
			<Button pill outline color="red" on:click={cancelPhoneVerification}>
				Cancel
			</Button>
		</div>
	</form>
</Modal>
