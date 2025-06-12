<script lang="ts">
	import MetaTag from '$lib/utils/MetaTag.svelte';
	import { Button, Card } from 'flowbite-svelte';
	import '../../app.css';
	import { _ } from 'svelte-i18n';

	const path: string = '/signin';
	// MetaTag props could also be localized if needed, but focusing on visible text first.
	const description: string = 'DSK - Better Teller Sign in'; // $_('login.metaDescription')
	const title: string = 'Signin to the platform'; // $_('login.metaTitle')
	const subtitle: string = 'Home'; // $_('login.metaSubtitle')
</script>

<!-- Main Content -->
<MetaTag {path} {description} {title} {subtitle} />
<main class="bg-gray-50 dark:bg-gray-900 w-full">
	<div
		class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900"
	>
		<Card class="w-full" size="md" border={false}>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
					{$_('login.cardTitle')}
				</h3>
				<form method="POST" action="/auth/signin/microsoft-entra-id">
					<input type="hidden" name="csrfToken" />
					<Button type="submit" size="xl" class="w-full buttonPrimary">
						{$_('login.dskIdButton')}
					</Button>
				</form>
				<p class="text-sm font-light text-gray-500 dark:text-gray-400">
					{$_('login.troubleSigningIn')}
					<span class="font-medium text-primary-600 dark:text-primary-500">
						{$_('login.contactSupport')}
					</span>
				</p>
			</div>
		</Card>
	</div>
</main>
