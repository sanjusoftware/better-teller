import type { Actions, PageServerLoad } from './$types';
import Clients from "$lib/data/clients.json";
import Tickets from "$lib/data/ticket_queue.json";

let ticket: string = ''; // Placeholder for the next ticket number

export const load: PageServerLoad = () => {
    console.log('ticket from server load:', ticket);
    let latestClients = Clients.slice(0, 5); // Get the first 5 clients from the list

    return {
        ticket: ticket,
        latestClients: latestClients
    }
};

export const actions: Actions = {
    getNextTicket: async () => {
        console.log('getNextTicket called');
        // Simulate an API call to fetch the next ticket        
        ticket = Math.ceil(Math.random() * 10000).toString(); // Placeholder for the next ticket number
    }
};