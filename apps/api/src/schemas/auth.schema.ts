import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(3).max(30),
    fullName: z.string().min(1),
    role: z.enum(['USER', 'COMPANY']).default('USER'),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1),
});