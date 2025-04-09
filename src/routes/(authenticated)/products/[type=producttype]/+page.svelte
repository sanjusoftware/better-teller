<script lang="ts">
	import {
		Section,
		PricingBodyHead,
		PricingCard,
		PricingItemWrapper,
		PricingHead,
		PricingItem
	} from 'flowbite-svelte-blocks';
	import { Breadcrumb, BreadcrumbItem, Button, Toggle } from 'flowbite-svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let yearly: boolean = $state(false);
	let prices: string[][] = [
		['$24', '$200'],
		['$49', '$400'],
		['$499', '$1500']
	];
	let period = $derived(yearly ? 'year' : 'month');
</script>

<Breadcrumb>
	<BreadcrumbItem href="/dashboard" home>Home</BreadcrumbItem>
	<BreadcrumbItem href="/products/all">Products</BreadcrumbItem>
	<BreadcrumbItem>
		{data.productCateory.toLocaleUpperCase()} Products
	</BreadcrumbItem>
</Breadcrumb>

<Section name="pricing" sectionClass='relative py-0 sm:py-0';>
	<PricingHead divClass="mb-6 lg:mb-8" pClass="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
		<svelte:fragment slot="h2">{data.productCateory.toLocaleUpperCase()} Products</svelte:fragment>
		<svelte:fragment slot="paragraph">
			Our pricing plan made simple. Our products provide all types of businesses and individuals the option to decide how they need to spend.		
			<div class="flex items-center pt-4">
				<span class="text-base font-medium text-gray-900 dark:text-white"> Monthly</span>
				<Toggle class="ms-3 peer-focus:ring-0" bind:checked={yearly} />
				<span class="text-base font-medium text-gray-900 dark:text-gray-400"> Yearly </span>
			</div>	
		</svelte:fragment>
	</PricingHead>

	<div class="lg:grid lg:grid-cols-3 sm:gap-2 xl:gap-4 lg:space-y-0">
		{#each data.products as product}
			<PricingCard>
				<PricingBodyHead>
					<svelte:fragment slot="h3">{product.productName}</svelte:fragment>
					<svelte:fragment slot="paragraph">
						{product.productDescription}
					</svelte:fragment>
					<svelte:fragment slot="price">
						<span class="mr-2 text-5xl font-extrabold">{period === 'year' ? product.interestRate * 12 :  product.interestRate}</span>
						<span class="text-gray-500 dark:text-gray-400">BGN/{period}</span>
					</svelte:fragment>
				</PricingBodyHead>
				<PricingItemWrapper>
					{#each product.productBenefits as benefit}
						<PricingItem class="text-green-500 dark:text-green-400">
							<span>{benefit}</span>
						</PricingItem>
					{/each}
					<svelte:fragment slot="btn">
						<Button>Get started</Button>
					</svelte:fragment>
				</PricingItemWrapper>
			</PricingCard>
		{/each}
	</div>
</Section>
