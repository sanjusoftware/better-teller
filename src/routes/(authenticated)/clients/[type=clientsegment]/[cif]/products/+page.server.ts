import Cards from "$lib/data/cards.json";
import Loans from "$lib/data/loans.json";
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url, fetch }) => {
    const response = await fetch('/api/accounts');
    const allAccounts = await response.json();
    const accounts = allAccounts.filter((account) => account.clientId === params.cif);

    return {
        open: url.searchParams.get('open'),
        accounts: accounts,
        cards: Cards.filter((card) => card.customerId === Number(params.cif)),
        loans: Loans.filter((loan) => loan.customerId === Number(params.cif))
    };
}) satisfies PageServerLoad;