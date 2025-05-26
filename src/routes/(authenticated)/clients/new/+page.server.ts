import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { IDSchema } from '$lib/schemas/clientSchema';
import type { PageServerLoad } from "./$types";
import { generateCustomerId } from '$lib/utils/strings';

export const load: PageServerLoad = async ({ cookies }) => {
  let scannedData = cookies.get('scanned-data')
  console.log('scannedData', scannedData)
  let newClientForm = null;
  if (scannedData) {
    let data = JSON.parse(scannedData)
    newClientForm = await superValidate(data, zod(IDSchema));
  } else {
    newClientForm = await superValidate(zod(IDSchema));
  }

  return {
    newClientForm: newClientForm,
    clientType: 'retail'
  };
};

export const actions = {
  createNewClient: async ({ request }) => {
    const form = await superValidate(request, zod(IDSchema));
    if (!form.valid) return fail(400, { form });

    // Simulate a successful client creation operation
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for the scan operation
    const clientNumber = generateCustomerId(10); // Generate a random client number
    console.log('Client created with number:', clientNumber);
    
    return {
      form,
      success: true,
      message: 'Client created successfully with number: ' + clientNumber,
      clientNumber: clientNumber
    };
  }
}