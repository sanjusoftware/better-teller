import type { PageServerLoad } from './$types';
import Accounts from "$lib/data/accounts.json";
import Cards from "$lib/data/cards.json";
import Loans from "$lib/data/loans.json";
import Transactions from "$lib/data/transactions.json";

export const load = (async ({ params, url }) => {
    let accounts = Accounts.filter((account) => account.customerId === Number(params.cif))
    let transactions = new Map();
    accounts.forEach(account => {
        const relatedTransactions = Transactions.filter(transaction => 
            transaction.from_account === account.iban || transaction.to_account === account.iban
        );        
        transactions.set(account.iban, relatedTransactions);
    });
    return {
        open: url.searchParams.get('open'),
        accounts: Accounts.filter((account) => account.customerId === Number(params.cif)),
        cards: Cards.filter((card) => card.customerId === Number(params.cif)),
        loans: Loans.filter((loan) => loan.customerId === Number(params.cif)),
        transactions: transactions,
    };
}) satisfies PageServerLoad;