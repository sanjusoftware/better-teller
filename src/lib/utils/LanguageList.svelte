<script lang="ts">
	import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

</script>

<Button
	id="languages-list"
	color="none"
	class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
>
	<span class="fi fi-us h-5 w-5 mt-0.5"></span>
</Button>
<Dropdown placement="bottom" triggeredBy="#languages-list">
    <DropdownItem>
        <a
            href="/"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
        >
            <div class="inline-flex items-center">
                <span class="fi fi-us h-3.5 w-3.5 mr-2"></span>
                English (US)
            </div>
        </a>
    </DropdownItem>
    <DropdownItem>
        <a
            href="/"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
            role="menuitem"
        >
            <div class="inline-flex items-center">
                <span class="fi fi-bg h-3.5 w-3.5 mr-2"></span>
                Bulgarian
            </div>
        </a>
    </DropdownItem>
</Dropdown>
