<script>
  import "../app.css";
  import { page } from "$app/state";
  import {
    CartSolid,
    ChartPieSolid,
    MailBoxOutline,
    DollarOutline,
    CreditCardOutline,
    HomeOutline,
    FileLinesOutline,
    LifeSaverSolid,
  } from "flowbite-svelte-icons";
  import {
    NavBrand,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    SidebarDropdownWrapper,
    SidebarDropdownItem
  } from "flowbite-svelte";
  $: activeUrl = page.url.pathname;
  let spanClass = "flex-1 ms-3 whitespace-nowrap font-medium";
  let activeClass =
    "flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700";
  let nonActiveClass =
    "flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700";
</script>

<div class="antialiased bg-gray-50 dark:bg-gray-900">
  <!-- Top Nav -->
  <nav
    class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50"
  >
    <div class="flex flex-wrap justify-between items-center">
      <div class="flex justify-start items-center">
        <!-- Sidebar toggle control in mobile view -->
        <button
          data-drawer-target="drawer-navigation"
          data-drawer-toggle="drawer-navigation"
          aria-controls="drawer-navigation"
          class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Toggle sidebar</span>
        </button>

        <!-- Branding - DSK Logo -->
        <NavBrand href="/" class="flex items-center justify-between mr-4">
          <img src="../images/dsk.svg" class="mr-3 h-8" alt="DSK Logo" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Better Teller</span
          >
        </NavBrand>

        <!-- Top nav Search -->
        <form action="#" method="GET" class="hidden md:block md:pl-2">
          <label for="topbar-search" class="sr-only">Search</label>
          <div class="relative md:w-64 md:w-96">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="email"
              id="topbar-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
            />
          </div>
        </form>
      </div>

      <div class="flex items-center lg:order-2">
        <!-- Toggle Search button for mobile view -->
        <button
          type="button"
          data-drawer-toggle="drawer-navigation"
          aria-controls="drawer-navigation"
          class="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Toggle search</span>
          <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            ></path>
          </svg>
        </button>

        <!-- Notifications -->
        <button
          type="button"
          data-dropdown-toggle="notification-dropdown"
          class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        >
          <span class="sr-only">View notifications</span>
          <!-- Bell icon -->
          <svg
            aria-hidden="true"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            ></path>
          </svg>
        </button>

        <!-- Notifications Dropdown -->
        <div
          id="notification-dropdown"
          class="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl"
        >
          <div
            class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
          >
            Notifications
          </div>
          <!-- Notifications -->
          <div>
            <a
              href="/"
              class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <div class="flex-shrink-0">
                <img
                  class="w-11 h-11 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  alt="Bonnie Green avatar"
                />
                <div
                  class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    class="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                    />
                    <path
                      d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                    />
                  </svg>
                </div>
              </div>
              <div class="pl-3 w-full">
                <div
                  class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                >
                  New message from
                  <span class="font-semibold text-gray-900 dark:text-white"
                    >Bonnie Green</span
                  >: "Hey, what's up? All set for the presentation?"
                </div>
                <div
                  class="text-xs font-medium text-primary-600 dark:text-primary-500"
                >
                  a few moments ago
                </div>
              </div>
            </a>
            <a
              href="/"
              class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <div class="flex-shrink-0">
                <img
                  class="w-11 h-11 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  alt="Jese Leos avatar"
                />
                <div
                  class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    class="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                    />
                  </svg>
                </div>
              </div>
              <div class="pl-3 w-full">
                <div
                  class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                >
                  <span class="font-semibold text-gray-900 dark:text-white"
                    >Jese leos</span
                  >
                  and
                  <span class="font-medium text-gray-900 dark:text-white"
                    >5 others</span
                  >
                  started following you.
                </div>
                <div
                  class="text-xs font-medium text-primary-600 dark:text-primary-500"
                >
                  10 minutes ago
                </div>
              </div>
            </a>
          </div>
          <!-- View All link -->
          <a
            href="/"
            class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
          >
            <div class="inline-flex items-center">
              <svg
                aria-hidden="true"
                class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              View all
            </div>
          </a>
        </div>

        <!-- User Menu -->
        <button
          type="button"
          class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="dropdown"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-8 h-8 rounded-full"
            src="../images/profile.jpg"
            alt="user"
          />
        </button>
        <!-- User dropdown menu -->
        <div
          id="dropdown"
          class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
        >
          <div class="py-3 px-4">
            <span
              class="block text-sm font-semibold text-gray-900 dark:text-white"
              >Sanjeev Mishra</span
            >
            <span class="block text-sm text-gray-900 truncate dark:text-white"
              >sanjeev.mishra@dskbank.bg</span
            >
          </div>
          <ul
            class="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <a
                href="/"
                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >My profile</a
              >
            </li>
            <li>
              <a
                href="/"
                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >Account settings</a
              >
            </li>
          </ul>
          <ul
            class="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <a
                href="/"
                class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                ><svg
                  class="mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                  />
                </svg>
                Collections
              </a>
            </li>
          </ul>
          <ul
            class="py-1 text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown"
          >
            <li>
              <a
                href="/"
                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <!-- Sidebar -->
  <Sidebar
    {activeUrl}
    {activeClass}
    {nonActiveClass}
    id="drawer-navigation"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
  >
    <SidebarWrapper
      class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800"
    >
      <form action="#" method="GET" class="md:hidden mb-2">
        <label for="sidebar-search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            name="search"
            id="sidebar-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search"
          />
        </div>
      </form>
      <SidebarGroup>
        <SidebarItem label="Dashboard" class="font-medium">
          <svelte:fragment slot="icon">
            <ChartPieSolid
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarDropdownWrapper label="Products" class="font-medium">
          <svelte:fragment slot="icon">
            <CartSolid
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          <SidebarDropdownItem label="Loans" />
          <SidebarDropdownItem label="Cards" />
          <SidebarDropdownItem label="Mortgages" />
        </SidebarDropdownWrapper>
        <SidebarItem label="Inbox" {spanClass}>
          <svelte:fragment slot="icon">
            <MailBoxOutline
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          <svelte:fragment slot="subtext">
            <span
              class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"
            >
              3
            </span>
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Payments" href="/payments" class="font-medium">
          <svelte:fragment slot="icon">
            <DollarOutline
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Cards" href="/cards" class="font-medium">
          <svelte:fragment slot="icon">
            <CreditCardOutline
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Mortgages" href="/mortgage" class="font-medium">
          <svelte:fragment slot="icon">
            <HomeOutline
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
      <SidebarGroup border>
        <SidebarItem label="Documents" href="/documents" class="font-medium">
          <svelte:fragment slot="icon">
            <FileLinesOutline
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Help">
          <svelte:fragment slot="icon">
            <LifeSaverSolid
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
    <div
      class="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20"
    >
      <a
        href="/"
        data-tooltip-target="tooltip-configurations"
        class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        aria-label="Product Configurations"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
          ></path>
        </svg>
      </a>
      <div
        id="tooltip-configurations"
        role="tooltip"
        class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
      >
        Product Configurations
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <a
        href="/"
        data-tooltip-target="tooltip-settings"
        class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        aria-label="Settings"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
      <div
        id="tooltip-settings"
        role="tooltip"
        class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
      >
        Settings
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <button
        type="button"
        data-dropdown-toggle="language-dropdown"
        class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        aria-label="Language"
      >
        <svg
          aria-hidden="true"
          class="h-5 w-5 rounded-full mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 3900 3900"
        >
          <path fill="#b22234" d="M0 0h7410v3900H0z" />
          <path
            d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
            stroke="#fff"
            stroke-width="300"
          />
          <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
          <g fill="#fff">
            <g id="d">
              <g id="c">
                <g id="e">
                  <g id="b">
                    <path
                      id="a"
                      d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                    />
                    <use xlink:href="#a" y="420" />
                    <use xlink:href="#a" y="840" />
                    <use xlink:href="#a" y="1260" />
                  </g>
                  <use xlink:href="#a" y="1680" />
                </g>
                <use xlink:href="#b" x="247" y="210" />
              </g>
              <use xlink:href="#c" x="494" />
            </g>
            <use xlink:href="#d" x="988" />
            <use xlink:href="#c" x="1976" />
            <use xlink:href="#e" x="2470" />
          </g>
        </svg>
      </button>
      <!-- Language Dropdown -->
      <div
        class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        id="language-dropdown"
      >
        <ul class="py-1" role="none">
          <li>
            <a
              href="/"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
              role="menuitem"
            >
              <div class="inline-flex items-center">
                <svg
                  aria-hidden="true"
                  class="h-3.5 w-3.5 rounded-full mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  id="flag-icon-css-us"
                  viewBox="0 0 512 512"
                >
                  <g fill-rule="evenodd">
                    <g stroke-width="1pt">
                      <path
                        fill="#bd3d44"
                        d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                        transform="scale(3.9385)"
                      />
                      <path
                        fill="#fff"
                        d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                        transform="scale(3.9385)"
                      />
                    </g>
                    <path
                      fill="#192f5d"
                      d="M0 0h98.8v70H0z"
                      transform="scale(3.9385)"
                    />
                    <path
                      fill="#fff"
                      d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                      transform="scale(3.9385)"
                    />
                  </g>
                </svg>
                English (US)
              </div>
            </a>
          </li>
          <li>
            <a
              href="/"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
              role="menuitem"
            >
              <div class="inline-flex items-center">
                <svg
                  aria-hidden="true"
                  class="h-3.5 w-3.5 rounded-full mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  id="flag-icon-css-de"
                  viewBox="0 0 512 512"
                >
                  <path fill="#ffce00" d="M0 341.3h512V512H0z" />
                  <path d="M0 0h512v170.7H0z" />
                  <path fill="#d00" d="M0 170.7h512v170.6H0z" />
                </svg>
                Deutsch
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </Sidebar>
  <!-- Content -->
  <slot />
</div>
