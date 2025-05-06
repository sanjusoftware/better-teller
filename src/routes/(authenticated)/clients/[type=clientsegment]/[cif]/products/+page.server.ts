import Accounts from "$lib/data/accounts.json";
import Cards from "$lib/data/cards.json";
import Loans from "$lib/data/loans.json";
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url }) => {
    return {
        open: url.searchParams.get('open'),
        accounts: Accounts.filter((account) => account.customerId === Number(params.cif)),
        cards: Cards.filter((card) => card.customerId === Number(params.cif)),
        loans: Loans.filter((loan) => loan.customerId === Number(params.cif))
    };
}) satisfies PageServerLoad;