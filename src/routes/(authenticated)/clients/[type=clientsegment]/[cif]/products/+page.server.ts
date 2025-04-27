import type { PageServerLoad } from './$types';
import Accounts from "$lib/data/accounts.json";
import Cards from "$lib/data/cards.json";
import Loans from "$lib/data/loans.json";
import Transactions from "$lib/data/transactions.json";

export const load = (async ({ params, url }) => {
    return {
        open: url.searchParams.get('open'),
        accounts: Accounts.filter((account) => account.customerId === Number(params.cif)),
        cards: Cards.filter((card) => card.customerId === Number(params.cif)),
        loans: Loans.filter((loan) => loan.customerId === Number(params.cif)),
        transactions: Transactions.filter((t) => t.from_account === 'BGSOF0009556677002' || t.to_account === 'BGSOF0009556677002'),
    };
}) satisfies PageServerLoad;