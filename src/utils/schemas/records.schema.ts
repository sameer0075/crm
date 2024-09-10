import { z } from 'zod';

const typeEnum = z.enum(['LEAD', 'OPPORTUNITY', 'APPOINTMENT', 'DEAL']);
const leadSourceEnum = z.enum(['EMAIL', 'PHONE', 'BOTH']);
const stageEnum = z.enum(['CLOSED', 'WITHDRAWN', 'WON', 'LOST']);

const recordsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  type: typeEnum,
  status: z.string().min(1, 'Status is required'),
  lead_source: leadSourceEnum,
  industry: z.string().optional(),
  website: z.string().optional(),
  date: z.date().optional(),
  stage: stageEnum.optional(),
  phone: z.string().optional(),
});

export { recordsSchema };
