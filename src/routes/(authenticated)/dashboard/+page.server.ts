import type { Actions, PageServerLoad } from './$types';
import Clients from "$lib/data/clients.json";
import Tickets from "$lib/data/ticket_queue.json";

export const load: PageServerLoad = ({ cookies }) => {
    let pastClientIDs = JSON.parse(cookies.get('pastClientIDs') ?? '[]')
    let currentClientID = cookies.get('currentClientID')
    let currentTicket = cookies.get('currentTicket');
    let currentClient = undefined;

    if(currentClientID){
        currentClient = Clients.find((c) => c.cif === parseInt(currentClientID))
    }

    console.log('pastClientIDs:', pastClientIDs)
    console.log('currentTicket:', currentTicket)
    console.log('currentClient:', currentClient)    

    return {
        currentClient: currentClient,
        pastClients: Clients.filter((c) => pastClientIDs.includes(c.cif)),
        currentTicket: currentTicket
    }
};

export const actions = {
    getNextTicket: async ({ cookies }) => {
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