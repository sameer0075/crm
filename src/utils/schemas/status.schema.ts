import { z } from 'zod';

const statusSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .or(z.undefined())
    .refine((val) => val !== undefined, {
      message: 'Name is required', // Custom message for undefined
    }),
  statusFor: z
    .string()
    .nonempty('statusFor is required')
    .or(z.undefined())
    .refine((val) => val !== undefined && val !== '', {
      message: 'statusFor is required', // Custom message for undefined
    }),
});

export { statusSchema };
