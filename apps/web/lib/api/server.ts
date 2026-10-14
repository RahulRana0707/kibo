import "server-only"

import { headers } from "next/headers"

import { readEnvelope } from "@/lib/api/envelope"

const API_URL = process.env.API_URL ?? "http://localhost:8090"

function createUrl(path: string) {
  return new URL(path, API_URL).toString()
}

/** Calls the API from the server with the visitor's cookie; returns `result`. */
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
      ...(init.body ? { "content-type": "application/json" } : {}),
      ...init.headers,
    },
  })

  return readEnvelope<T>(response)
}
