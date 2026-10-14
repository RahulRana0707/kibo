import type { ApiErrorDetails, ApiIssue, ErrorCode } from "@kibo/contracts"

/** A failed API call: `code` says why, `message` is ready to show. */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: ErrorCode = "INTERNAL_ERROR",
    public readonly details: ApiErrorDetails | null = null
  ) {
    super(message)
    this.name = "ApiError"
  }

  /** Field errors from validation, keyed by dotted path (`rules.0.trigger`). */
  get issues(): ApiIssue[] {
    return this.details?.issues ?? []
  }
}
