import type { PageServerLoad } from './$types';
import Clients from "$lib/data/clients.json";

export const load: PageServerLoad = () => {
    let latestClients = Clients.slice(0, 5); // Get the first 5 clients from the list

    return {
        latestClients: latestClients
    }
};

export const actions = {
	startService: async ({ request }) => {
		const data = await request.formData();
		const ticket = data.get('ticket');

        if (!ticket) {
            return {
                success: false, 
                message: 'No ticket provided'
            };
        }
        
        // Simulate a service start operation
        // In a real-world scenario, you would perform an operation here, like updating a database or calling ticketQueue API to lock the ticket
        console.log('Locked ticket for starting service', ticket);

        return {
            success: true, 
            message: 'Service started successfully',
            ticket: ticket+'Locked' // Simulate a locked ticket
        };
	},
};