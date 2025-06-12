import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, fetch }) => {
    let accountNumber = url.searchParams.get('accountnumber');
    let cif = url.searchParams.get('cif');
    let transactionsToDisplay = [];

    // Fetch all accounts
    const accountsResponse = await fetch('/api/accounts');
    if (!accountsResponse.ok) {
        throw error(accountsResponse.status, `Failed to fetch accounts: ${accountsResponse.statusText}`);
    }
    const allAccounts = await accountsResponse.json();

    // Fetch all transactions
    const transactionsResponse = await fetch('/api/transactions');
    if (!transactionsResponse.ok) {
        throw error(transactionsResponse.status, `Failed to fetch transactions: ${transactionsResponse.statusText}`);
    }
    const allTransactions = await transactionsResponse.json();

    if (accountNumber) {
        const account = allAccounts.find((acc) => acc.accountNumber === accountNumber);
        if (!account) {
            // If account number is given but not found, perhaps return empty or specific error
            // For now, it will fall through to returning empty transactionsToDisplay, which is acceptable.
            // Alternatively, throw error(404, 'Account not found');
        } else {
            cif = account.clientId; // Update cif based on the found account
            transactionsToDisplay = allTransactions.filter(
                (t) => t.sourceAccountId === account.id || t.destinationAccountId === account.id
            );
        }
    } else if (cif) {
        const clientAccounts = allAccounts.filter((acc) => acc.clientId === cif);
        const clientAccountIds = clientAccounts.map(acc => acc.id);
        if (clientAccountIds.length > 0) {
            transactionsToDisplay = allTransactions.filter(
                (t) => clientAccountIds.includes(t.sourceAccountId) || clientAccountIds.includes(t.destinationAccountId)
            );
        }
    }
    // If neither accountNumber nor cif is provided, transactionsToDisplay remains empty as initialized.

    return {
        accountNumber: accountNumber,
        cif: cif, // This will be the original cif or the one derived from accountNumber
        transactions: transactionsToDisplay
    }
};