import "server-only"

import { headers } from "next/headers"

import { ApiError } from "@/lib/api/error"

const API_URL = process.env.API_URL ?? "http://localhost:4000"

function createUrl(path: string) {
  return new URL(path, API_URL).toString()
}

async function getErrorMessage(response: Response) {
  try {
    const body = (await response.json()) as { message?: unknown }

    if (typeof body.message === "string") {
      return body.message
    }

    if (Array.isArray(body.message)) {
      return body.message.join(", ")
    }
  } catch {
    // Use the status text below when the API does not return JSON.
  }

  return response.statusText || "Request failed"
}

export async function apiServerFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const incomingHeaders = await headers()
  const cookie = incomingHeaders.get("cookie")
  const response = await fetch(createUrl(path), {
    ...init,
    cache: "no-store",
    headers: {
      ...(cookie ? { cookie } : {}),
      ...init.headers,
    },
  })

  if (!response.ok) {
    throw new ApiError(await getErrorMessage(response), response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
