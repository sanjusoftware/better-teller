import type { PageLoad } from './$types';
import Clients from "$lib/data/clients.json";
import Accounts from "$lib/data/accounts.json";
import Cards from "$lib/data/cards.json";
import Loans from "$lib/data/loans.json";
import Documents from "$lib/data/documents.json";
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
    const client = Clients.find((client) => client.cif === Number(params.cif) && client.type === params.type)
    if (!client) {
        throw error(404, 'Client not found')
    }
    return {
        client: client,
        Accounts: Accounts.filter((account) => account.customerId === Number(params.cif)),
        Cards: Cards.filter((card) => card.customerId === Number(params.cif)),
        Loans: Loans.filter((loan) => loan.customerId === Number(params.cif)),
        Documents: Documents.filter((document) => document.customerId === Number(params.cif))
    }
};