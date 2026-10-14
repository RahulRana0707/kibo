import { z } from "zod"

/** Metadata is display-only and small: never queried, never over 8 KB. */
export const METADATA_MAX_BYTES = 8 * 1024

export const hexColorSchema = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Use a hex colour like #7c3aed.")

export const linkSchema = z.object({
  label: z.string().trim().min(1).max(40),
  url: z.url("Enter a full link starting with https://."),
})

/**
 * Wraps a metadata object so unknown keys are dropped and the stored JSON
 * stays under the size cap.
 */
export function metadataSchema<Shape extends z.ZodRawShape>(shape: Shape) {
  return z
    .object(shape)
    .refine(
      // Characters, not bytes: close enough for a guard, and needs no DOM types
      (value) => JSON.stringify(value).length <= METADATA_MAX_BYTES,
      { message: "Metadata must be 8 KB or smaller." }
    )
}
