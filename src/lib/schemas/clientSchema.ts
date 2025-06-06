import { z } from 'zod';
import { documentTypes } from '$lib/utils/constants';
const phoneNumberSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, {
  message: "Invalid phone number format. It should start with an optional '+' followed by 1 to 15 digits."
});

export const IDSchema = z.object({
  id_front_image: z.string(),
  id_back_image: z.string(),
  document_number: z.string().nonempty(),
  names_cyrilic: z.string().nonempty(),
  names_latin: z.string(),
  egn: z.string().nonempty(),
  document_type: z.enum([...documentTypes] as [string, ...string[]]),
  id_issue_date: z.string().nonempty(),
  id_expiry_date: z.string().nonempty(),
  issuing_country: z.string().nonempty(),
  issuing_authority: z.string().nonempty(),
  date_of_birth: z.string(),
  place_of_birth: z.string(),
  citizenship: z.string().nonempty(),
  gender: z.string(),
  residence: z.string(),
  permanent_address: z.string().nonempty(),
  post_code: z.string().nonempty(),
  matches_mailing_address: z.boolean().default(true),
  mailing_address: z.object({
    apt_no: z.string(),
    location: z.string(),
    street_name: z.string(),
    street_no: z.string(),
    quarter: z.string(),
    floor_no: z.string(),
    post_code: z.string()
  })
});

export const contactSchema = z.object({
  email: z.string().email(),
  phone_number: phoneNumberSchema,
});

export const gdprSchema = contactSchema.extend({
  employer_name: z.string(),
  designation: z.string(),
  employment_start_date: z.date(),
  salary: z.number().positive()
});

