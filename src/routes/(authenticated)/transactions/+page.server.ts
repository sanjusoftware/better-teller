import type { PageServerLoad } from './$types';
import Transactions from '$lib/data/transactions.json';
import Accounts from '$lib/data/accounts.json';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = ({ url }) => {
    let accountNumber = url.searchParams.get('accountnumber')
    let cif = url.searchParams.get('cif')
    let filteredTransactions = Transactions;

    if (accountNumber) {
        let account = Accounts.find((acc) => acc.accountNumber === accountNumber);
        if (!account) {
            throw error(404, 'Account not found')
        }
        cif = account.customerId.toString();
        filteredTransactions = filteredTransactions.filter((t) => t.from_account === accountNumber || t.to_account === accountNumber);
    } else if (cif) {
        let accountNumbers = Accounts.filter((acc) => acc.customerId.toString() === cif).map(acc => acc.iban)
        filteredTransactions = filteredTransactions.filter((t) => accountNumbers.includes(t.from_account) || accountNumbers.includes(t.to_account));
    }
    else {
        filteredTransactions = []
    }

    return {
        acountNumber: accountNumber,
        cif: cif,
        transactions: filteredTransactions
    }
};