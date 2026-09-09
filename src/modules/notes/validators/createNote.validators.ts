import { capitalizeFirst } from '@/shared/helpers/capitalizeFirstLetter.helper';
import { z } from 'zod';
import { NOTE_CATEGORY_ENUM } from '../constants/noteCategory.constant';

const multipartBoolean = z.preprocess(
  (value) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  },
  z.boolean()
);

const optionalString = (schema: z.ZodString) => 
  z.preprocess(
    (value) =>{
      if(typeof value === 'string' && value.trim() === ""){
        return undefined;
      }
      return value;
    },
    schema.optional()
  )

export const createNoteSchema = z.object({
    body: z.object({
        title: z
            .preprocess((v) => (typeof v === 'string' ? v.trim() : v), z.string().min(3).max(120))
            .transform((s) => capitalizeFirst(s)),

        description: z.preprocess((v) => {
            if (typeof v !== 'string') return v;
            const trimmed = v.trim();
            return trimmed.length ? capitalizeFirst(trimmed) : trimmed;
        }, z.string().min(5).max(1000)),

        subject: z.string().trim().min(1).max(100),

        category: z.enum(NOTE_CATEGORY_ENUM),

        tags: z
            .array(z.string().trim().min(1).max(30))
            .max(10, 'At most 10 tags can be applied')
            .optional()
            .transform((tags) => {
                if (!tags) return undefined;
                const normalized = tags.map((t) => t.toLowerCase());
                return Array.from(new Set(normalized));
            }),
        collegeName: optionalString(z.string().trim().max(200)),
        course: optionalString(z.string().trim().max(100)),
        branch: optionalString(z.string().trim().max(100)),
        university: optionalString(z.string().trim().max(100)),
        semester: z.preprocess(
            (value) => (value === '' ? undefined : value),
            z.coerce.number().int().min(1).max(10).optional()
        ),
        language: z.string().trim().length(2).default('en'),
        isPublic: multipartBoolean.default(true),
        canDownload: multipartBoolean.default(true),
    }),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
