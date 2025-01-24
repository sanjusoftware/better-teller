import type { PageLoad } from '../profile/[cif]/$types';
import Clients from "../../../../data/clients.json";
import Accounts from "../../../../data/accounts.json";
import Cards from "../../../../data/cards.json";

export const load: PageLoad = ({ params }) => {
    return {
        client: Clients.find((client) => client.id === Number(params.cif)),
        Accounts: Accounts.filter((account) => account.customerId === Number(params.cif)),
        Cards: Cards.filter((card) => card.customerId === Number(params.cif))
    }
};