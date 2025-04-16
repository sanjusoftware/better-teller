import type { Actions, PageServerLoad } from './$types';
import Clients from "$lib/data/clients.json";
import Tickets from "$lib/data/ticket_queue.json";

export const load: PageServerLoad = ({ cookies }) => {
    let pastClientIds = JSON.parse(cookies.get('pastClientIDs') ?? '[]')
    console.log('pastClientIds:', pastClientIds)
    console.log('currentTicket:', cookies.get('currentTicket'))

    return {
        currentClient: Clients.find((c) => c.cif === parseInt(cookies.get('currentClientID') || '0')),
        pastClients: Clients.filter((c) => pastClientIds.includes(c.cif)),
        currentTicket: cookies.get('currentTicket') ?? ''
    }
};

export const actions = {
    getNextClient: async ({ cookies }) => {
        let pastClientIds = JSON.parse(cookies.get('pastClientIDs') ?? '[]') // The CIA is watching 
        let currentClientID = cookies.get('currentClientID')

        if (currentClientID) {
            pastClientIds.push(currentClientID)
            cookies.set('pastClientIDs', JSON.stringify(pastClientIds), { path: '/' })
            cookies.delete('currentClientID', { path: '/' })
        }

        // get the next ticket from the queue
        let nextTicket = Tickets.pop()
        cookies.set('currentTicket', nextTicket?.ticket_number ?? '', { path: '/' })
    }
} satisfies Actions;