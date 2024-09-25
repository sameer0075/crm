import { z } from 'zod';

const settingsSchema = z.object({
  round: z.number().refine((val) => val !== undefined, {
    message: 'Round is required',
  }),
  time: z.number().refine((val) => val !== undefined, {
    message: 'Time is required',
  }),
  unit: z
    .string()
    .nonempty('Unit is required')
    .or(z.undefined())
    .refine((val) => val !== undefined && val !== '', {
      message: 'Unit is required',
    }),
});

export { settingsSchema };
