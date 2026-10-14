import { readEnvelope } from "@/lib/api/envelope"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8090"

function createUrl(path: string) {
  return new URL(path, API_URL).toString()
}

/** Calls the API from the browser with the session cookie; returns `result`. */
export async function apiClientFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(createUrl(path), {
    ...init,
    credentials: "include",
    headers: {
      ...(init.body ? { "content-type": "application/json" } : {}),
      ...init.headers,
    },
  })

  return readEnvelope<T>(response)
}
