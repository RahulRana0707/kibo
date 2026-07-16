"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { toast } from "sonner"

import { createBot, updateBot } from "@/lib/api/bots.client"
import type { BotInput } from "@/lib/api/types"
import { useRequest } from "@/hooks/use-request"

export function useBotForm(botId?: string | null) {
  const router = useRouter()
  const request = useCallback(
    async (input: BotInput) => {
      if (botId) {
        return updateBot(botId, input)
      }

      return createBot(input)
    },
    [botId]
  )

  const saveBotRequest = useRequest(request, {
    onSuccess: () => {
      toast.success(botId ? "Bot updated." : "Bot created.")
      router.push("/bots")
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    saveBot: saveBotRequest.run,
    isSavingBot: saveBotRequest.isPending,
  }
}
