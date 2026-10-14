import { describe, expect, it } from "vitest"

import {
  botListQuerySchema,
  botMetadataSchema,
  createBotSchema,
  escalationRulesSchema,
  getBotTemplate,
  updateBotSchema,
} from "../src/index.js"

describe("createBotSchema", () => {
  it("trims the name and turns an empty purpose into null", () => {
    const result = createBotSchema.parse({ name: "  Pip  ", purpose: "" })
    expect(result.name).toBe("Pip")
    expect(result.purpose).toBeNull()
  })

  it("rejects an empty or over-long name", () => {
    expect(createBotSchema.safeParse({ name: "   " }).success).toBe(false)
    expect(createBotSchema.safeParse({ name: "x".repeat(41) }).success).toBe(false)
  })

  it("accepts Hinglish and rejects Devanagari Hindi", () => {
    expect(
      createBotSchema.safeParse({ name: "Pip", languages: ["en", "hi-Latn"] }).success
    ).toBe(true)
    expect(createBotSchema.safeParse({ name: "Pip", languages: ["hi"] }).success).toBe(false)
  })

  it("rejects a language listed twice", () => {
    expect(
      createBotSchema.safeParse({ name: "Pip", languages: ["en", "en"] }).success
    ).toBe(false)
  })

  it("only accepts known templates", () => {
    expect(createBotSchema.safeParse({ name: "Pip", templateKey: "gaming" }).success).toBe(true)
    expect(createBotSchema.safeParse({ name: "Pip", templateKey: "cooking" }).success).toBe(false)
  })
})

describe("updateBotSchema", () => {
  it("needs at least one setting", () => {
    expect(updateBotSchema.safeParse({}).success).toBe(false)
  })

  it("keeps the confidence threshold between 50 and 99", () => {
    expect(updateBotSchema.safeParse({ confidenceThreshold: 49 }).success).toBe(false)
    expect(updateBotSchema.safeParse({ confidenceThreshold: 50 }).success).toBe(true)
    expect(updateBotSchema.safeParse({ confidenceThreshold: 99 }).success).toBe(true)
    expect(updateBotSchema.safeParse({ confidenceThreshold: 100 }).success).toBe(false)
  })

  it("limits voice notes to 1,000 characters with a readable message", () => {
    const result = updateBotSchema.safeParse({ voiceNotes: "x".repeat(1001) })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe(
      "Keep voice notes to 1,000 characters."
    )
  })

  it("only allows the three cooldowns", () => {
    expect(updateBotSchema.safeParse({ viewerCooldownSeconds: 30 }).success).toBe(true)
    expect(updateBotSchema.safeParse({ viewerCooldownSeconds: 45 }).success).toBe(false)
  })

  it("rejects duplicate blocked topics regardless of case", () => {
    expect(
      updateBotSchema.safeParse({ blockedTopics: ["Politics", "politics"] }).success
    ).toBe(false)
  })
})

describe("escalationRulesSchema", () => {
  it("accepts an empty list and caps it at 20 rules", () => {
    const rule = { trigger: "Spoilers", severity: "normal", action: "hide_and_review" }
    expect(escalationRulesSchema.safeParse({ rules: [] }).success).toBe(true)
    expect(
      escalationRulesSchema.safeParse({ rules: Array.from({ length: 21 }, () => rule) }).success
    ).toBe(false)
  })
})

describe("metadata", () => {
  it("drops unknown keys and rejects oversized values", () => {
    const parsed = botMetadataSchema.parse({ notes: "Ranked", secret: "x" })
    expect(parsed).toEqual({ notes: "Ranked" })
    expect(
      botMetadataSchema.safeParse({ notes: "x".repeat(500), avatarUrl: `https://a.io/${"x".repeat(9000)}` })
        .success
    ).toBe(false)
  })
})

describe("botListQuerySchema", () => {
  it("defaults to all and ignores an empty search", () => {
    expect(botListQuerySchema.parse({ q: "  " })).toEqual({ status: "all", q: undefined })
  })
})

describe("templates", () => {
  it("finds a template by key", () => {
    expect(getBotTemplate("gaming")?.personality).toBe("hype")
    expect(getBotTemplate("nope")).toBeUndefined()
  })
})
