import type { PageServerLoad } from './$types';
import Clients from "$lib/data/clients.json";
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = () => {
    let latestClients = Clients.slice(0, 5); // Get the first 5 clients from the list

    return {
        latestClients: latestClients
    }
};

export const actions = {
    getNextTicket: async () => {
        // Call ticket aquiring api to get a new ticket number from the queue

        const ticket = Math.ceil(Math.random() * 10000);

        return {
            success: true,
            message: "Ticket aquired successfully",
            ticket: ticket
        };
    },

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
            ticket: ticket // Simulate a locked ticket
        };
    },

    endService: async ({ request, cookies }) => {
        const data = await request.formData();
        const ticket = data.get('ticket');

        if (!ticket) {
            return {
                success: false,
                message: 'No ticket provided'
            };
        } else {
            // Simulate a service end operation
            // In a real-world scenario, you would perform an operation here, like updating a database or calling ticketQueue API to unlock the ticket
            console.log('Unlocked ticket for ending service', ticket);
            redirect(303, '/dashboard', { type: 'success', message: "Congratulations! You completed service successfully!" }, cookies);
        }
    },

    startScan: async ({ cookies }) => {
        console.log('Scanning ID document...');
        // Simulate a ID scan operation 
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay for the scan operation
        console.log('ID document scanned successfully!');

        // In a real-world scenario, you would perform an operation here, like calling an ID scanning API
        // or processing the ID document image.
        // For this example, we'll just simulate a successful scan with a random client from the list
        const scannedClient = Clients[Math.floor(Math.random() * Clients.length)];

        if (!scannedClient) {
            // If no client is found, return an error message
            console.error('Scan failed. No client found.');
            return {
                success: false,
                message: 'Scan failed. No client found.'
            };
        }

        // If a client is found, redirect to the client profile page with a success message
        console.log('Scanned client:', scannedClient);
        let message = "ID Scanned successfully. You are serving " + scannedClient.name;
        redirect(303, "/clients/" + scannedClient.type + "/" + scannedClient.cif, { type: 'success', message: message }, cookies);
    }
};