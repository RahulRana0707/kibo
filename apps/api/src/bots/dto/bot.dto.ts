import { z } from 'zod';

const optionalText = z
  .string()
  .trim()
  .transform((value) => value || null)
  .nullable()
  .optional();

export const botInputSchema = z.object({
  name: z.string().trim().min(1, 'Bot name is required.').max(80),
  avatarUrl: optionalText,
  personality: optionalText,
  welcomeMessage: optionalText,
});

export type BotInputDto = z.infer<typeof botInputSchema>;
