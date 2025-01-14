<script>
    import '../app.css';
    import { page } from '$app/state';
    import { ChevronDownOutline, ChartPieSolid, MailBoxOutline, DollarOutline, CreditCardOutline, HomeOutline, FileLinesOutline} from 'flowbite-svelte-icons';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
    $: activeUrl = page.url.pathname;
    let spanClass = 'flex-1 ms-3 whitespace-nowrap';
</script>

<div class="relative px-8">
  <Navbar rounded color="form" class="px-2 sm:px-4 py-2.5 w-full z-20 top-0 start-0 border-b">
    <NavBrand href="/">
      <img src="/images/dsk.svg" class="me-3 h-6 sm:h-9" alt="DSK Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Better Teller</span>
    </NavBrand>
    <div class="flex md:order-2">
      <!-- <Button size="sm">Login</Button> -->
      <Avatar id="avatar-menu" src="/images/profile.jpg" />
      <NavHamburger />
    </div>
    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
        <DropdownHeader>
          <span class="block text-sm">Sanjeev Mishra</span>
          <span class="block truncate text-sm font-medium">Teller</span>
        </DropdownHeader>
        <DropdownItem>Settings</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Sign out</DropdownItem>
      </Dropdown>
    <NavUl {activeUrl}>
      <NavLi href="/pricing">Loans</NavLi>
      <NavLi href="/contact">Cards</NavLi>
      <NavLi class="cursor-pointer">
        Retail<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20">
        <DropdownItem href="/">New Client</DropdownItem>
        <DropdownDivider/>
        <DropdownItem href="/docs/components/navbar">New Loan</DropdownItem>
        <DropdownItem href="/">New Card</DropdownItem>
      </Dropdown>
      <NavLi class="cursor-pointer">
        Business<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20">
        <DropdownItem href="/">New Client</DropdownItem>
        <DropdownDivider/>
        <DropdownItem href="/docs/components/navbar">New Loan</DropdownItem>
        <DropdownItem href="/">New Card</DropdownItem>
      </Dropdown>
    </NavUl>
  </Navbar>
<div class="mt-4"></div>
    <Sidebar {activeUrl}>
        <SidebarWrapper>
        <SidebarGroup>
            <SidebarItem label="Dashboard">
            <svelte:fragment slot="icon">
                <ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            </SidebarItem>
            <SidebarItem label="Inbox" {spanClass}>
            <svelte:fragment slot="icon">
                <MailBoxOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
                <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
            </svelte:fragment>
            </SidebarItem>
            <SidebarItem label="Payments" href="/payments">
                <svelte:fragment slot="icon">
                    <DollarOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </svelte:fragment>
            </SidebarItem>
            <SidebarItem label="Cards" href="/cards">
                <svelte:fragment slot="icon">
                    <CreditCardOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </svelte:fragment>
            </SidebarItem>
            <SidebarItem label="Mortgages" href="/mortgage">
                <svelte:fragment slot="icon">
                    <HomeOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </svelte:fragment>
            </SidebarItem>       
            <SidebarItem label="Documents" href="/documents">
                <svelte:fragment slot="icon">
                    <FileLinesOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </svelte:fragment>
            </SidebarItem>                                  
        </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
    <div class="flex flex-col md:flex-row">
        <div class="flex-1 p-4">
            <slot></slot>
        </div>
    </div>
</div>