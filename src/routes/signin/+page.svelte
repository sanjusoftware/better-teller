<script lang="ts">
	import '../../app.css';
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button } from 'flowbite-svelte';
	import Navbar from '$lib/utils/Navbar.svelte';
	import MetaTag from '$lib/utils/MetaTag.svelte';

	const path: string = '/';
	const description: string = 'DSK - Better Teller App';
	const title: string = 'DSK - Better Teller App';
	const subtitle: string = 'Home';
</script>

<div class="antialiased bg-gray-50 dark:bg-gray-900">
	<!-- Top Nav -->
	<Navbar />

	<!-- Main Content -->
	<MetaTag {path} {description} {title} {subtitle} />
	<main class="p-4 h-auto pt-20 pb-20">
		<Section name="login" sectionClass="pt-20">
			<Register
				href="/"
				divClass="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
			>
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
						Login to access the portal
					</h3>
					<form method="POST" action="/auth/signin/microsoft-entra-id">
						<input type="hidden" name="csrfToken" >						
						<Button type="submit" class="w-full buttonPrimary">Login in with your DSK ID</Button>	
					</form>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Trouble signingin?
						<span class="font-medium text-primary-600 dark:text-primary-500">
							Please contact the DSK bank for assistance.
						</span>
					</p>
				</div>
			</Register>
		</Section>
	</main>
</div>
