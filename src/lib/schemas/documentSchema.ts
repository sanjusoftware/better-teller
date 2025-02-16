import { z } from 'zod';
import { documentTypes } from '$lib/utils/constants';

let documentTypeEnum = documentTypes.map((k) => k.value);
let documentTypeNames = documentTypes.map((k) => k.name).join(', ');

export const documentSchema = z.object({
  document_file: z
    .instanceof(File, { message: 'Please upload a file.' })
    .refine((f) => f.size < 1000_000, 'Max 1000 kB upload size.'),
  document_type: z.enum([documentTypeEnum[0], ...documentTypeEnum.slice(1)], {
    errorMap(issue, ctx) {
      switch (issue.code) {
        case 'invalid_type': {
          if (ctx.data === undefined)
            return { message: 'Document Type is required' }
          return { message: 'Document Type must be one of '+ documentTypeNames }
        }
        case 'invalid_enum_value':
          return { message: 'Document Type must be one of '+ documentTypeNames }
      }
      return { message: ctx.defaultError }
    }
  }).default(''),
  document_issuer: z.string(),
  document_issue_date: z.date(),
  document_expiry_date: z.date().nullable()
});