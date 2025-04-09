<script lang="ts">
    import type { PageData } from './$types';
	import Settings from './UserSettings.svelte';
    import MetaTag from '$lib/utils/MetaTag.svelte';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

    let { data }: { data: PageData } = $props();

    const settingsPath: string = '/settings';
	const description: string = 'User Settings';
	const title: string = 'Better Teller - Manage Settings';
	const subtitle: string = 'Manage Settings';
</script>

<MetaTag path={settingsPath} {description} {title} {subtitle} />

<Breadcrumb class="mb-5">
	<BreadcrumbItem home href='/dashboard'>Home</BreadcrumbItem>
	<BreadcrumbItem href={settingsPath}>
		My Settings
	</BreadcrumbItem>
</Breadcrumb>
<div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4">
    <Settings />
    <Settings />    
</div>