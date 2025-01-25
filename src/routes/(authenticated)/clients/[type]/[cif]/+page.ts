import type { PageLoad } from './$types';
import Clients from "../../../../data/clients.json";
import Accounts from "../../../../data/accounts.json";
import Cards from "../../../../data/cards.json";
import Loans from "../../../../data/loans.json";
import Documents from "../../../../data/documents.json";

export const load: PageLoad = ({ params }) => {
    return {
        client: Clients.find((client) => client.id === Number(params.cif)),
        Accounts: Accounts.filter((account) => account.customerId === Number(params.cif)),
        Cards: Cards.filter((card) => card.customerId === Number(params.cif)),
        Loans: Loans.filter((loan) => loan.customerId === Number(params.cif)),
        Documents: Documents.filter((document) => document.customerId === Number(params.cif))
    }
};