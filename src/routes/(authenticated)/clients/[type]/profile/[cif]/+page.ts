import type { PageLoad } from './$types';
import Clients from "../../../../../data/clients.json";

export const load: PageLoad = ({ params }) => {
    return {
        client: Clients.filter((client) => client.id === Number(params.cif))[0]
    }
};