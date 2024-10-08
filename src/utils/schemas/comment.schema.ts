import { z } from 'zod';

const commentsSchema = z.object({
  recordId: z
    .string()
    .nonempty('Record Id is required') // For empty strings
    .or(z.undefined()) // Allows undefined to be handled explicitly
    .refine((val) => val !== undefined, {
      message: 'Record Id is required', // Custom message for undefined
    }),
  comment: z
    .string()
    .nonempty('Comment is required')
    .or(z.undefined()) // Allows undefined to be handled explicitly
    .refine((val) => val !== undefined, {
      message: 'Comment is required', // Custom message for undefined
    }),
  status: z
    .string()
    .nonempty('Status is required')
    .or(z.undefined()) // Allows undefined to be handled explicitly
    .refine((val) => val !== undefined && val !== '', {
      message: 'Status is required', // Custom message for undefined
    }),
  customDate: z.string().nullable().optional(),
});

export { commentsSchema };
