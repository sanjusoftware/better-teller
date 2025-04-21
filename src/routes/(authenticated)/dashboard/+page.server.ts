import type { PageServerLoad } from './$types';
import Clients from "$lib/data/clients.json";

export const load: PageServerLoad = () => {
    let latestClients = Clients.slice(0, 5); // Get the first 5 clients from the list

    return {
        latestClients: latestClients
    }
};