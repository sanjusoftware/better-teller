<script lang="ts">
	import MetaTag from '$lib/utils/MetaTag.svelte';
	import { Button, Card } from 'flowbite-svelte';
	import '../../app.css';

	const path: string = '/signin';
	const description: string = 'DSK - Better Teller Sign in';
	const title: string = 'Signin to the platform';
	const subtitle: string = 'Home';
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
					Login to access the portal
				</h3>
				<form method="POST" action="/auth/signin/microsoft-entra-id">
					<input type="hidden" name="csrfToken" />
					<Button type="submit" size="xl" class="w-full buttonPrimary">
						Login in with your DSK ID
					</Button>
				</form>
				<p class="text-sm font-light text-gray-500 dark:text-gray-400">
					Trouble signingin?
					<span class="font-medium text-primary-600 dark:text-primary-500">
						Contact the DSK bank for assistance.
					</span>
				</p>
			</div>
		</Card>
	</div>
</main>
