"use client"

import { useCallback, useState } from "react"

type RequestStatus = "idle" | "pending" | "success" | "error"

type UseRequestOptions<TData> = {
  onSuccess?: (data: TData) => void
  onError?: (error: Error) => void
}

export function useRequest<TArgs extends unknown[], TData>(
  request: (...args: TArgs) => Promise<TData>,
  options: UseRequestOptions<TData> = {}
) {
  const [status, setStatus] = useState<RequestStatus>("idle")
  const [error, setError] = useState<Error | null>(null)

  const run = useCallback(
    async (...args: TArgs) => {
      setStatus("pending")
      setError(null)

      try {
        const data = await request(...args)
        setStatus("success")
        options.onSuccess?.(data)
        return data
      } catch (caughtError) {
        const error =
          caughtError instanceof Error
            ? caughtError
            : new Error("Request failed")

        setError(error)
        setStatus("error")
        options.onError?.(error)
        throw error
      }
    },
    [options, request]
  )

  return {
    run,
    error,
    status,
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
  }
}
