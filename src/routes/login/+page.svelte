<script lang="ts">
	import '../../app.css';
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
	import Navbar from '../(authenticated)/Navbar.svelte';

	import MetaTag from '../utils/MetaTag.svelte';

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
	<main class="p-4 h-auto pt-20">
		<Section name="login" sectionClass="pt-20">
			<Register href="/" divClass="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<form class="flex flex-col space-y-6" method="POST">
						<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Login to access the portal</h3>
						<Label class="space-y-2">
							<span>DSK Username</span>
							<Input name="username" placeholder="B0050605" required />
						</Label>
						<Label class="space-y-2">
							<span>Your password</span>
							<Input type="password" name="password" placeholder="•••••" required />
						</Label>
						<Button type="submit" class="w-full1">Sign in</Button>
						<p class="text-sm font-light text-gray-500 dark:text-gray-400">
							Don’t have an account yet? <a
								href="/"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							>
								Sign up
							</a>
						</p>
					</form>
				</div>
			</Register>
		</Section>
	</main>
</div>
