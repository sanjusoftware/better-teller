import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, fetch }) => {
    // Fetch account details
    const accountResponse = await fetch(`/api/accounts/${params.productid}`);

    if (!accountResponse.ok) {
        throw error(accountResponse.status, `Failed to fetch account: ${accountResponse.statusText}`);
    }

    const account = await accountResponse.json();

    if (!account || account.clientId !== params.cif) {
        throw error(404, 'No ' + params.producttype + ' account found with ID# ' + params.productid + ' for this client');
    }

    // Fetch all transactions
    const transactionsResponse = await fetch('/api/transactions');
    if (!transactionsResponse.ok) {
        throw error(transactionsResponse.status, `Failed to fetch transactions: ${transactionsResponse.statusText}`);
    }
    const allTransactions = await transactionsResponse.json();

    // Filter transactions related to the account
    // The account ID is params.productid
    const relatedTransactions = allTransactions.filter(transaction =>
        transaction.sourceAccountId === params.productid || transaction.destinationAccountId === params.productid
    );

    return {
        account: account,
        transactions: relatedTransactions
    }
}) satisfies PageServerLoad;