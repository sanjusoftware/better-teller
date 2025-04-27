<script lang="ts">
	import { Badge } from 'flowbite-svelte';

	export let account: any;

	const color = () => {
		switch (account.ownership) {
			case 'primary':
				return 'green';
			case 'secondary':
				return 'yellow';
			case 'poa':
				return 'indigo';
			default:
				return 'dark';
		}
	};
	const accountOwnership = (ownership: string) => {
		switch (ownership) {
			case 'primary':
				return 'Primary owner';
			case 'secondary':
				return 'Joint account holder';
			case 'poa':
				return 'Legal representative';
			default:
				return 'question-mark';
		}
	};
</script>

<Badge rounded color={color()} class="text-sm font-medium">
	{accountOwnership(account.ownership)}
</Badge>
