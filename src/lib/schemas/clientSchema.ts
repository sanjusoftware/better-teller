import { z } from 'zod';
import {IDTypes}  from '$lib/utils/constants';
let idTypeEnum = IDTypes.map((k) => k.value);
let idTypeNames = IDTypes.map((k) => k.name).join(', ');
const phoneNumberSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, {
  message: "Invalid phone number format. It should start with an optional '+' followed by 1 to 15 digits."
});

export const IDSchema = z.object({
  id_number: z.string().nonempty(),
  id_type: z.enum([idTypeEnum[0], ...idTypeEnum.slice(1)], {
    errorMap(issue, ctx) {
      switch (issue.code) {
        case 'invalid_type': {
          if (ctx.data === undefined)
            return { message: 'ID Type is required' }
          return { message: 'ID Type must be '+ idTypeNames }
        }
        case 'invalid_enum_value':
          return { message: 'ID Type must be '+ idTypeNames }
      }
      return { message: ctx.defaultError }
    }
  }).default(''),
  id_issue_date: z.date().max(new Date(), { message: "Issue date should be the past." }),
  id_expiry_date: z.date().min(new Date(), { message: "Expiry date should be the future." }),
  issuing_country: z.string()
});

export const profileSchema = IDSchema.extend({
  profile_picture: z.string().optional(),
  full_name: z.string().nonempty(),
  email: z.string().email(),
  phone_number: phoneNumberSchema,
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
    zip_code: z.string().length(5)
  }),
  date_of_birth: z.date().max(new Date(), { message: "Date of birth should be the past." }),
});

export const employerSchema = profileSchema.extend({
  employer_name: z.string(),
  designation: z.string(),
  employment_start_date: z.date(),
  salary: z.number().positive()
});

