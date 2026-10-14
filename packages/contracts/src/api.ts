import type { ErrorCode } from "./errors.js"

/** A field that failed validation: `path` is dotted, such as `rules.0.trigger`. */
export type ApiIssue = { path: string; message: string }

export type ApiErrorDetails = { issues?: ApiIssue[] }

export type ApiErrorBody = {
  code: ErrorCode
  /** One sentence the UI can show as is. */
  message: string
  details: ApiErrorDetails | null
}

export type ApiSuccess<T> = { status: "success"; result: T; error: null }

export type ApiFailure = { status: "failed"; result: null; error: ApiErrorBody }

/**
 * Every API route answers with this envelope. The HTTP status code still
 * says what happened (201, 404, 409…); `error.code` says why.
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export function success<T>(result: T): ApiSuccess<T> {
  return { status: "success", result, error: null }
}

export function failure(error: ApiErrorBody): ApiFailure {
  return { status: "failed", result: null, error }
}

export function isApiResponse(value: unknown): value is ApiResponse<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    (value.status === "success" || value.status === "failed") &&
    "result" in value &&
    "error" in value
  )
}
