import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import Accounts from "$lib/data/accounts.json"
import Transactions from "$lib/data/transactions.json";

export const load = (async ({ params }) => {
    const account = Accounts.find((account) => account.iban === params.productid && account.customerId.toString() === params.cif)
    if (!account) {
        throw error(404, 'No ' + params.producttype + ' account found with ID# ' + params.productid);
    }

    const transactions = Transactions.filter(transaction => 
        transaction.from_account === account.iban || transaction.to_account === account.iban
    )

    return {
        account: account,
        transactions: transactions
    }
}) satisfies PageServerLoad;