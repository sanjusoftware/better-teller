import Clients from "$lib/data/clients.json";
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, url }) => {
    const client = Clients.find((client) => client.cif === Number(params.cif) && client.type === params.type)
    if (!client) {
        throw error(404, 'No ' + params.type +' client not found with ID# ' + params.cif);
    }

    return {
        client: client
    }
};