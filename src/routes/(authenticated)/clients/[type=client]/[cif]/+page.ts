import type { PageLoad } from './$types';
import Clients from "../../../../data/clients.json";
import Accounts from "../../../../data/accounts.json";
import Cards from "../../../../data/cards.json";
import Loans from "../../../../data/loans.json";
import Documents from "../../../../data/documents.json";
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
    const client = Clients.find((client) => client.id === Number(params.cif) && client.type === params.type)
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