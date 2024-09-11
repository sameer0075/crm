import { z } from 'zod';

const typeEnum = z.enum(['LEAD', 'OPPORTUNITY', 'APPOINTMENT', 'DEAL']);
const leadSourceEnum = z.enum(['EMAIL', 'PHONE', 'BOTH']);
const stageEnum = z.enum(['CLOSED', 'WITHDRAWN', 'WON', 'LOST']);

const recordsSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  type: typeEnum,
  lead_source: leadSourceEnum,
  website: z.string().min(1, 'Website is required'),
  company: z.string().min(1, 'Company is required'),
  phone: z.string().min(1, 'Phone is required'),
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
