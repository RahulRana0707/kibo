import { z } from 'zod';

export const startIntegrationSchema = z.object({
  botId: z.string().trim().min(1, 'Bot id is required.'),
  provider: z.enum(['YOUTUBE', 'TWITCH']),
});

export type StartIntegrationDto = z.infer<typeof startIntegrationSchema>;
