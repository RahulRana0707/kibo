import { defaultErrorMessages, isApiResponse } from "@kibo/contracts"

import { ApiError } from "@/lib/api/error"

/**
 * Reads the API's `{ status, result, error }` envelope: returns `result`
 * on success and throws an `ApiError` with the code and message otherwise.
 */
export async function readEnvelope<T>(response: Response): Promise<T> {
  let body: unknown = null
  try {
    body = await response.json()
  } catch {
    // Not JSON: a proxy or crash page. Handled below.
  }

  if (isApiResponse(body)) {
    if (body.status === "success") {
      return body.result as T
    }
    throw new ApiError(
      body.error.message,
      response.status,
      body.error.code,
      body.error.details
    )
  }

  throw new ApiError(
    response.ok
      ? defaultErrorMessages.INTERNAL_ERROR
      : response.statusText || defaultErrorMessages.REQUEST_FAILED,
    response.status
  )
}
