import type { PageLoad } from './$types';
import Clients from '$lib/data/clients.json';

export const load: PageLoad = ({ params }) => {
    return {
        clienttype: params.type, 
        clients: Clients.filter((client) => client.type === params.type)
    }
}