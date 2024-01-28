import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Please enter a valid email',
  }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const changeReportStatusSchema = z.object({
  status: z.string(),
  id: z.string(),
});

export const deteteUserSchema = z.object({
  id: z.string(),
});
