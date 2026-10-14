/** Machine-readable reasons a request failed. The UI may branch on these. */
export const errorCodes = [
  "VALIDATION_FAILED",
  "UNAUTHENTICATED",
  "NOT_FOUND",
  "BOT_NOT_FOUND",
  "BOT_LIMIT_REACHED",
  "BOT_NAME_TAKEN",
  "BOT_IS_DRAFT",
  "BOT_ARCHIVED",
  "CONFIRM_NAME_MISMATCH",
  "REQUEST_FAILED",
  "INTERNAL_ERROR",
] as const

export type ErrorCode = (typeof errorCodes)[number]

/** One sentence per code, used when the API has nothing more specific to say. */
export const defaultErrorMessages: Record<ErrorCode, string> = {
  VALIDATION_FAILED: "Some fields need fixing.",
  UNAUTHENTICATED: "Log in to continue.",
  NOT_FOUND: "That page or item doesn’t exist.",
  BOT_NOT_FOUND: "That bot doesn’t exist or isn’t in this workspace.",
  BOT_LIMIT_REACHED: "You’ve used every bot your plan includes.",
  BOT_NAME_TAKEN: "Another bot in this workspace already has that name.",
  BOT_IS_DRAFT: "Finish setting up this bot before pausing or resuming it.",
  BOT_ARCHIVED: "Restore this bot first.",
  CONFIRM_NAME_MISMATCH: "The name you typed doesn’t match the bot’s name.",
  REQUEST_FAILED: "That request couldn’t be completed.",
  INTERNAL_ERROR: "Something went wrong on our side. Try again in a moment.",
}
