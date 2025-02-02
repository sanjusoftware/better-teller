import { z } from 'zod';
export const IDTypes = [{ value: 'passport', name: 'Passport' }, { value: 'dl', name: 'Driving Licence' }, { value: 'national_id', name: 'National ID' }, { value: 'egn', name: 'EGN' }];

let idTypeEnum = IDTypes.map((k) => k.value);

export const schemaIdInfo = z.object({
  id_number: z.string().nonempty(),
  id_type: z.enum([idTypeEnum[0], ...idTypeEnum.slice(1)], {
    errorMap(issue, ctx) {
      switch (issue.code) {
        case 'invalid_type': {
          if (ctx.data === undefined)
            return { message: 'ID Type is required' }
          return { message: 'Privacy setting must be a string' }
        }
        case 'invalid_enum_value':
          return { message: 'Select one of the allowed ID types from Passport, Driving License, National ID, or EGN' }
      }
      return { message: ctx.defaultError }
    }
  }).default(''),
  id_issue_date: z.date().max(new Date(), { message: "Issue date should be the past." }),
  id_expiry_date: z.date().min(new Date(), { message: "Expiry date should be the future." }),
  issuing_country: z.string()
});

export const schemaProfileInfo = schemaIdInfo.extend({
  profile_picture: z.string().url().default('/images/profile.jpg'),
  full_name: z.string().min(1),
  email: z.string().email(),
  phone_number: z.string().optional(),
  nationality: z.string().nonempty(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
    zip_code: z.string().length(5)
  }).optional(),
  date_of_birth: z.date().optional(),
});

export const schemaEmployerInfo = schemaProfileInfo.extend({
  employer_name: z.string(),
  designation: z.string(),
  employment_start_date: z.date(),
  salary: z.number().positive(),
  department: z.string().optional()
});

