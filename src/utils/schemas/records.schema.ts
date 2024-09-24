import { z } from 'zod';

const typeEnum = z
  .enum(['LEAD', 'OPPORTUNITY', 'APPOINTMENT', 'DEAL'], {
    required_error: 'Type is required', // Custom error message for required fields
    invalid_type_error: 'Invalid Type',
  })
  .optional();
const leadSourceEnum = z
  .enum(['EMAIL', 'PHONE', 'BOTH'], {
    required_error: 'Leadsource is required', // Custom error message for required fields
    invalid_type_error: 'Invalid lead source',
  })
  .optional();
const stageEnum = z.enum(['CLOSED', 'WITHDRAWN', 'WON', 'LOST']).optional();

const recordsSchema = z.object({
  firstName: z.string().nonempty('First Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
  fullName: z.string().nonempty('Name is required'),
  email: z.string().nonempty('Invalid Email'),
  type: typeEnum,
  lead_source: leadSourceEnum,
  website: z.string().nonempty('Website is required'),
  company: z.string().nonempty('Company is required'),
  phone: z.string().nonempty('Phone is required'),
  recordStatusId: z.string().nonempty('Record Status Id is required'),
  date: z.date().optional(),
  stage: stageEnum.optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  company_linkedin_url: z.string().optional(),
  linkedin_profile: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  industry: z.string().optional(),
});

export { recordsSchema };
