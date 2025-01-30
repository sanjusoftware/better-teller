<script lang="ts">
    import {
	Breadcrumb,
        BreadcrumbItem,
        Button,
        Card,
        Checkbox,
        Dropdown,
        Heading,
        Input,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";
    import {
        CalendarMonthOutline,
        ChevronDownOutline,
        ChevronRightOutline,
    } from "flowbite-svelte-icons";

    import LastRange from "./LastRange.svelte";
    import CreditCard from "../../../lib/utils/CreditCard.svelte";
    import StatusBadge from "./StatusBadge.svelte";

    const headers = [
        "Transaction",
        "Date & Time",
        "Amount",
        "Reference number",
        "Payment method",
        "Status",
    ];
    const data: [
        string,
        string,
        string,
        string,
        string,
        CreditCard["state"],
    ][] = [
        [
            "Payment from Bonnie Green",
            "Apr 23 ,2021",
            "$2300",
            "0047568936",
            "Visa",
            "completed",
        ],
        [
            "Payment refund to #00910",
            "Apr 23 ,2021",
            "-$670",
            "0078568936",
            "Mastercard",
            "completed",
        ],
        [
            "Payment failed from #087651",
            "Apr 18 ,2021",
            "$234",
            "0088568934",
            "Visa",
            "cancelled",
        ],
        [
            "Payment from Lana Byrd",
            "Apr 15 ,2021",
            "$5000",
            "0018568911",
            "Mastercard",
            "inprogress",
        ],
        [
            "Payment from Jese Leos",
            "Apr 15 ,2021",
            "$2300",
            "0045568939",
            "Mastercard",
            "completed",
        ],
        [
            "Refund to THEMESBERG LLC",
            "Apr 11 ,2021",
            "-$560",
            "0031568935",
            "Visa",
            "inreview",
        ],
        [
            "Payment from Lana Lysle",
            "Apr 6 ,2021",
            "$1437",
            "0023568934",
            "Mastercard",
            "inreview",
        ],
        [
            "Payment to Joseph Mcfall",
            "Apr 1 ,2021",
            "$980",
            "0057568935",
            "Visa",
            "completed",
        ],
        [
            "Payment from Alphabet",
            "Mar 23 ,2021",
            "$11,436",
            "00836143841",
            "Visa",
            "inprogress",
        ],
        [
            "Payment from Bonnie Green",
            "Mar 23 ,2021",
            "$560",
            "0031568935",
            "Mastercard",
            "completed",
        ],
    ];
</script>

<Card size="xl" class="shadow-sm max-w-none">
    <Breadcrumb class="mb-5">
		<BreadcrumbItem home>Home</BreadcrumbItem>
		<BreadcrumbItem href="/transactions">Transactions</BreadcrumbItem>
	</Breadcrumb>

    <div class="items-center justify-between lg:flex">
        <div class="mb-4 mt-px lg:mb-0">
            <Heading
                tag="h3"
                class="-ml-0.25 mb-2 text-xl font-semibold dark:text-white"
            >
                Transactions
            </Heading>
        </div>
        <div
            class="items-center justify-between gap-3 space-y-4 sm:flex sm:space-y-0"
        >
            <div class="flex items-center">
                <Button
                    color="alternative"
                    class="w-fit whitespace-nowrap px-4 py-2"
                >
                    Filter by status
                    <ChevronDownOutline size="lg" />
                </Button>
                <Dropdown
                    class="w-44 space-y-3 p-3 text-sm"
                    placement="bottom-start"
                >
                    <li>
                        <Checkbox class="accent-primary-600"
                            >Completed (56)</Checkbox
                        >
                    </li>
                    <li><Checkbox checked>Cancelled (56)</Checkbox></li>
                    <li>
                        <Checkbox class="accent-primary-600"
                            >In progress (56)</Checkbox
                        >
                    </li>
                    <li><Checkbox checked>In review (97)</Checkbox></li>
                </Dropdown>
            </div>
            <div class="flex items-center space-x-4">
                <Input placeholder="From" class="w-full">
                    <CalendarMonthOutline slot="left" size="md" />
                </Input>
                <Input placeholder="To" class="w-full">
                    <CalendarMonthOutline slot="left" size="md" />
                </Input>
            </div>
        </div>
    </div>
    <Table
        hoverable={true}
        noborder
        striped
        class="mt-6 min-w-full divide-y divide-gray-200 dark:divide-gray-600"
    >
        <TableHead class="bg-gray-50 dark:bg-gray-700">
            {#each headers as header}
                <TableHeadCell class="whitespace-nowrap p-4 font-normal"
                    >{header}</TableHeadCell
                >
            {/each}
        </TableHead>
        <TableBody>
            {#each data as [name, date, amount, reference, method, status]}
                <TableBodyRow>
                    <TableBodyCell class="px-4 font-normal"
                        >{name}</TableBodyCell
                    >
                    <TableBodyCell
                        class="px-4 font-normal text-gray-500 dark:text-gray-400"
                    >
                        {date}
                    </TableBodyCell>
                    <TableBodyCell class="px-4">{amount}</TableBodyCell>
                    <TableBodyCell
                        class="px-4 font-normal  text-gray-500 dark:text-gray-400"
                    >
                        {reference}
                    </TableBodyCell>
                    <TableBodyCell
                        class="flex items-center gap-2 px-4 font-normal  text-gray-500 dark:text-gray-400"
                    >
                        <CreditCard cardType={method} /> <span>••• {reference.slice(reference.length - 4, reference.length)}</span>
                    </TableBodyCell>
                    <TableBodyCell class="px-4 font-normal"
                        ><StatusBadge state={status} /></TableBodyCell
                    >
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
    <div class="-mb-1 flex items-center justify-between pt-3 sm:pt-6">
        <LastRange />
        <a
            href="#top"
            class="inline-flex items-center rounded-lg p-1 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
        >
            Transactions report <ChevronRightOutline size="lg" />
        </a>
    </div>
</Card>
