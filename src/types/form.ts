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

export const changePasswordSchema = z.object({
  passwordCurrent: z
    .string()
    .min(1, { message: 'Password is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  passwordConfirm: z
    .string()
    .min(1, { message: 'Password is required' }),
});

export const updatePriceSchema = z.object({
  price: z.string().min(1, { message: 'Required' }),
  plan: z
    .union([z.literal('yearly'), z.literal('monthly')])
    .optional(),
});

export const logoutSchema = z.object({});
