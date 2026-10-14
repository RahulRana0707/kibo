import { z } from "zod"

import { hexColorSchema, linkSchema, metadataSchema } from "./metadata.js"

/** Bots a workspace on the free trial can have. Billing raises it per plan. */
export const TRIAL_BOT_LIMIT = 1

export const memberRoles = ["owner"] as const
export type MemberRole = (typeof memberRoles)[number]

/**
 * Details the UI shows about a workspace but nothing filters or sorts on.
 * Anything that becomes queryable moves to its own column.
 */
export const workspaceMetadataSchema = metadataSchema({
  logoUrl: z.url().optional(),
  bannerUrl: z.url().optional(),
  accentColor: hexColorSchema.optional(),
  description: z.string().trim().max(280).optional(),
  timezone: z.string().trim().max(64).optional(),
  links: z.array(linkSchema).max(10).optional(),
})

export type WorkspaceMetadata = z.infer<typeof workspaceMetadataSchema>

export const updateWorkspaceSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Enter a workspace name.")
      .max(60, "Use 60 characters or fewer."),
    metadata: workspaceMetadataSchema,
  })
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "Change at least one field.",
  })

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>

export type WorkspaceDto = {
  id: string
  name: string
  personal: boolean
  role: MemberRole
  defaultBotId: string | null
  metadata: WorkspaceMetadata
  limits: { bots: { used: number; max: number } }
}
