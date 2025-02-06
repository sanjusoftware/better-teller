<script lang="ts">
	import {
		Section,
		PricingBodyHead,
		PricingCard,
		PricingItemWrapper,
		PricingHead,
		PricingItem
	} from 'flowbite-svelte-blocks';
	import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<Breadcrumb>
	<BreadcrumbItem href="/dashboard" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Products</BreadcrumbItem>
	<BreadcrumbItem href={`/clients/${data.productCateory}`}>
		{data.productCateory.toLocaleUpperCase()} Products
	</BreadcrumbItem>
</Breadcrumb>

<Section name="pricing">
	<PricingHead>
		<svelte:fragment slot="h2">{data.productCateory.toLocaleUpperCase()} Products</svelte:fragment>
		<svelte:fragment slot="paragraph">
			Top selling {data.productCateory.toLocaleUpperCase()} products for DSK customers .
		</svelte:fragment>
	</PricingHead>
	<div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
		{#each data.products as product}
			<PricingCard>
				<PricingBodyHead>
					<svelte:fragment slot="h3">{product.productName}</svelte:fragment>
					<svelte:fragment slot="paragraph">
						Best option for personal use & for your next project.
					</svelte:fragment>
					<svelte:fragment slot="price">
						<span class="mr-2 text-5xl font-extrabold">{product.interestRate}</span>
						<span class="text-gray-500 dark:text-gray-400">BGN/month</span>
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
