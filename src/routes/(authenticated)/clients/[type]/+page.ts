import type { PageLoad } from './$types';
import Clients from '../../../data/clients.json';


export const load: PageLoad = ({ params }) => {
    return {
        clienttype: params.type.toLocaleUpperCase(), 
        clients: Clients.filter((client) => client.type === params.type)
    }
};