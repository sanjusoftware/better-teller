import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { employerSchema as lastStep } from './clientSchema';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
  const newClientForm = await superValidate(zod(lastStep));

  return { 
    newClientForm: newClientForm, 
    clientType: params.type.toLocaleUpperCase()
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