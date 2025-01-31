import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { schemaEmployerInfo as lastStep } from './clientSchema';

export const load = async ({params}) => {
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
      return message(form, 'Form posted successfully!');
    }
  };