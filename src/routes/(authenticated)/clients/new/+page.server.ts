import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { gdprSchema as lastStep } from '$lib/schemas/clientSchema';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  let scannedData = cookies.get('scanned-data')
  console.log('scannedData', scannedData)
  let newClientForm = null;
  if (scannedData) {
    let data = JSON.parse(scannedData)
    newClientForm = await superValidate(data, zod(lastStep));
  } else {
    newClientForm = await superValidate(zod(lastStep));
  }

  return {
    newClientForm: newClientForm,
    clientType: 'retail'
  };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(lastStep));
    console.log(form);
    if (!form.valid) return fail(400, { form });

    // TODO: Do something with the validated form.data

    // Display a success status message
    return message(form, 'Client created successfully!');
  }
};