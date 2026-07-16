import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required.'),
  BETTER_AUTH_SECRET: z.string().optional(),
  WEB_URL: z.url().default('http://localhost:3000'),
  API_URL: z.url().default('http://localhost:4000'),
  GOOGLE_YOUTUBE_CLIENT_ID: z.string().optional(),
  GOOGLE_YOUTUBE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_YOUTUBE_REDIRECT_URI: z.url().optional(),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
