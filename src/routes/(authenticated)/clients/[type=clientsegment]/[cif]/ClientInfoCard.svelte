<script lang="ts">
	import { humanize } from '$lib/utils/strings';
	import { Button, Card, Tooltip } from 'flowbite-svelte';
	import { CheckCircleOutline, CloseCircleOutline } from 'flowbite-svelte-icons';
	import IDCard from './IDCard.svelte';
	import PhoneVerification from './PhoneVerification.svelte';
	import EmailVerification from './EmailVerification.svelte';
	let phoneVerficationModal = $state(false);
	let emailVerficationModal = $state(false);

	let { client } = $props();

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
							<Button
								size="xs"
								outline
								class="p-1 text-xs"
								on:click={() => (phoneVerficationModal = true)}
							>
								Verify
							</Button>
							<PhoneVerification phone={client.phone} bind:sendOTPOpen={phoneVerficationModal} />
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
							<EmailVerification email={client.email} bind:sendOTPOpen={emailVerficationModal} />
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
