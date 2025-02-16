import type { PageServerLoad } from './$types';
import Clients from "$lib/data/clients.json";
import Accounts from "$lib/data/accounts.json";
import Cards from "$lib/data/cards.json";
import Loans from "$lib/data/loans.json";
import Documents from "$lib/data/documents.json";
import { documentSchema } from '$lib/schemas/documentSchema';
import { message, fail, superValidate } from 'sveltekit-superforms';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ params }) => {
    const client = Clients.find((client) => client.cif === Number(params.cif) && client.type === params.type)
    if (!client) {
        throw error(404, 'Client not found')
    }

    const documentForm = await superValidate(zod(documentSchema));
    return {
        documentForm: documentForm,
        client: client,
        Accounts: Accounts.filter((account) => account.customerId === Number(params.cif)),
        Cards: Cards.filter((card) => card.customerId === Number(params.cif)),
        Loans: Loans.filter((loan) => loan.customerId === Number(params.cif)),
        Documents: Documents.filter((document) => document.customerId === Number(params.cif))
    }
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(documentSchema));
        console.log("form data is: ", form);

        if (!form.valid) return fail(400, { form });

        // save the file to the server        

        // Display a success status message
        return message(form, 'Document uploaded successfully!');
    }
};