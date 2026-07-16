import { z } from 'zod';

const optionalText = z
  .string()
  .trim()
  .transform((value) => value || null)
  .nullable()
  .optional();

const botIdSchema = z.string().trim().min(1, 'Bot id is required.');

export const createKnowledgeItemSchema = z.discriminatedUnion('type', [
  z.object({
    botId: botIdSchema,
    type: z.literal('FAQ'),
    question: z.string().trim().min(1, 'Question is required.').max(240),
    answer: z.string().trim().min(1, 'Answer is required.').max(2000),
  }),
  z.object({
    botId: botIdSchema,
    type: z.literal('LINK'),
    title: z.string().trim().min(1, 'Title is required.').max(120),
    content: z.string().trim().min(1, 'Content is required.').max(2000),
    sourceUrl: optionalText,
  }),
  z.object({
    botId: botIdSchema,
    type: z.literal('RULE'),
    title: z.string().trim().min(1, 'Title is required.').max(120),
    content: z.string().trim().min(1, 'Content is required.').max(2000),
  }),
  z.object({
    botId: botIdSchema,
    type: z.literal('NOTE'),
    title: z.string().trim().min(1, 'Title is required.').max(120),
    content: z.string().trim().min(1, 'Content is required.').max(2000),
  }),
]);

export const updateKnowledgeItemSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('FAQ'),
    question: z.string().trim().min(1, 'Question is required.').max(240),
    answer: z.string().trim().min(1, 'Answer is required.').max(2000),
  }),
  z.object({
    type: z.literal('LINK'),
    title: z.string().trim().min(1, 'Title is required.').max(120),
    content: z.string().trim().min(1, 'Content is required.').max(2000),
    sourceUrl: optionalText,
  }),
  z.object({
    type: z.literal('RULE'),
    title: z.string().trim().min(1, 'Title is required.').max(120),
    content: z.string().trim().min(1, 'Content is required.').max(2000),
  }),
  z.object({
    type: z.literal('NOTE'),
    title: z.string().trim().min(1, 'Title is required.').max(120),
    content: z.string().trim().min(1, 'Content is required.').max(2000),
  }),
]);

export const importFaqCsvSchema = z.object({
  botId: botIdSchema,
  rows: z
    .array(
      z.object({
        question: z.string().trim().min(1, 'Question is required.').max(240),
        answer: z.string().trim().min(1, 'Answer is required.').max(2000),
      }),
    )
    .min(1, 'At least one FAQ row is required.')
    .max(500, 'Import at most 500 FAQ rows at once.'),
  filename: optionalText,
});

export type CreateKnowledgeItemDto = z.infer<typeof createKnowledgeItemSchema>;
export type UpdateKnowledgeItemDto = z.infer<typeof updateKnowledgeItemSchema>;
export type ImportFaqCsvDto = z.infer<typeof importFaqCsvSchema>;
