"use client"

import { useCallback, useState } from "react"
import { toast } from "sonner"

import { startIntegration } from "@/lib/api/integrations.client"
import type { IntegrationProvider } from "@/lib/api/types"
import { useRequest } from "@/hooks/use-request"

export function useIntegrationsPage() {
  const [startingProvider, setStartingProvider] =
    useState<IntegrationProvider | null>(null)

  const request = useCallback(
    async (input: { botId: string; provider: IntegrationProvider }) => {
      setStartingProvider(input.provider)
      const result = await startIntegration(input)

      if (result.authorizationUrl) {
        window.location.assign(result.authorizationUrl)
      }

      return result
    },
    []
  )

  const startIntegrationRequest = useRequest(request, {
    onSuccess: (result) => {
      if (result.authorizationUrl || result.status === "CONNECTED") {
        return
      }

      toast.info("Integration setup started.")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    startIntegration: async (input: {
      botId: string
      provider: IntegrationProvider
    }) => {
      try {
        return await startIntegrationRequest.run(input)
      } finally {
        setStartingProvider(null)
      }
    },
    isStartingIntegration: startIntegrationRequest.isPending,
    startingProvider,
  }
}
