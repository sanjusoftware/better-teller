import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const schema = z.object({
  full_name: z.string(),
  email: z.string().email()
});

export const load = async ({params}) => {
  const newClientForm = await superValidate(zod(schema));

  // Always return { form } in load functions
  return { 
    newClientForm: newClientForm, 
    clientType: params.type.toLocaleUpperCase()
   };
};

export const actions = {
    default: async ({ request }) => {
      const form = await superValidate(request, zod(schema));
      console.log(form);

      if (!form.valid) {
        // Will return fail(400, { form }) since form isn't valid
        return message(form, 'Please correct errors');
      }
  
      // TODO: Do something with the validated form.data
  
      // Display a success status message
      return message(form, 'Form posted successfully!');
    }
  };