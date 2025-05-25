import Clients from '$lib/data/clients.json';
import Documents from "$lib/data/documents.json";
import { documentSchema } from '$lib/schemas/documentSchema';
import { error } from "@sveltejs/kit";
import { promises as fs } from 'node:fs';
import path from 'path';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
    const client = Clients.find((client) => client.cif === Number(params.cif) && client.type === params.type)
    if (!client) {
        throw error(404, 'Client not found: CIF ' + params.cif);
    }

    const documentForm = await superValidate(zod(documentSchema));
    return {
        open: url.searchParams.get('open'),
        documentForm: documentForm,
        Documents: Documents.filter((document) => document.customerId === Number(params.cif))
    }
};

export const actions = {
    upload_document: async ({ request }) => {
        const form = await superValidate(request, zod(documentSchema));

        if (!form.valid) return fail(400, { form });

        // save the file to the server
        const file = form.data.document_file;
        if (!(file instanceof Object) || !file.name) {
            return fail(400, { form });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join('uploads', file.name);

        // Ensure the uploads directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });

        // Save the file to the uploads directory
        await fs.writeFile(filePath, buffer);

        // Display a success status message
        return message(form, 'Document uploaded successfully!');
    }
} satisfies Actions;