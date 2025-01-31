import { z } from 'zod';

export const schemaProfileInfo = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email()
});

export const schemaEmployerInfo = schemaProfileInfo.extend({
  employer_name: z.string(),
  designation: z.string()
});